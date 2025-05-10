import React, { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import ExcelHeader from "../../components/download/ExcelHeader";
import { fetchHFBankById } from "../../redux/features/HFBank/HFBankThunk";
import { useDispatch, useSelector } from "react-redux";

const HFBankDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reportRef = useRef();
  const { singleBank } = useSelector((state) => state.hfBanks);
  const reportData = singleBank;

  const handleExportPDF = async () => {
    try {
      const element = reportRef.current;
      if (!element) throw new Error("Report element not found");

      // Override unsupported colors
      const allElements = element.querySelectorAll("*");
      allElements.forEach((el) => {
        const style = window.getComputedStyle(el);
        if (
          style.color.includes("oklch") ||
          style.backgroundColor.includes("oklch")
        ) {
          el.style.color = "#000";
          el.style.backgroundColor = "#fff";
        }
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Extra pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("HFFC_Valuation_Report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. Check console for details.");
    }
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.table_to_book(reportRef.current, { sheet: "Report" });
    XLSX.writeFile(wb, "HFFC_Valuation_Report.xlsx");
  };

  const handleExportCSV = () => {
    const wb = XLSX.utils.table_to_book(reportRef.current, { sheet: "Report" });
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets["Report"]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "HFFC_Valuation_Report.csv");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchHFBankById(id));
    }
  }, [id, dispatch]);

  const observations = reportData?.observations || [
    "GIVEN XEROX COPY CO-OWNERSHIP DEED IN FAVOUR OF MR.JEEVAN LAL S/O MR.GHISILAL AND SMT.MAMTA W/O MR.JEEVAN LAL",
    "DURING PROPERTY VISIT MR.PHOOL SINGH JI MET AT THE PROPERTY WHO IS CUSTOMER CONTACT NO. 9200182821. IT WAS CLEARLY EXPLAINED TO HIM THAT THE PROPERTY VISIT IS BEING DONE FOR VALUATION PURPOSE IN RELATION WITH LOAN PROPOSAL.",
    "RATE HAS BEEN CONFIRM FORM MARKET ENQUIRY.",
    "PROPERTY IS SITUATED AT SURROUNDING AREA OF LOCALITY IS RESIDENTIAL CUM AGRICULTURE ZONING SURROUNDING AREA DEVELOPMENT IS 40%.",
    "AT SITE PROPERTY IS OPEN AND GF UNDER CONSTRUCTION PREMISES WHERE PLINTH WORK DONE.",
    "CONST COST CONSIDER AFTER COMPLETION OF WORK.",
    "PROPERTY IS IDENTIFIED BY FOUR SIDE BOUNDARIES OF GIVEN CO-OWNERSHIP DEED AND PRIVATE KEY LOCATION PLAN WHICH IS DRAWN BY ARCHITECT.",
    "AT SITE AREA OF UNDER CONSTRUCTION IS 15 X 30 = 450 SQFT AND OPEN AREA IS 15 X 30 = 450 SQFT.",
    "AS PER CO-OWNERSHIP DEED AND AS PER SITE LAND AREA IS 30 X 30 = 900 SQFT.",
    "OBTAIN COPY OF ARCHITECT MAP GF - 500 SQFT.",
    "AS PER DEED LAND USES IS RESIDENTIAL.",
    "SUGGEST TO CREDIT TEAM TO BE CHECK PROPER OWNERSHIP DOCUMENT PRIOR DISBURSEMENT.",
    "VALUER IS NOT RESPONSIBLE FOR ANY LEGAL DISPUTE.",
  ];

  return (
    <div className='container'>
      <div className='d-flex justify-content-end  my-2'>
        <button
          className=' border-2  p-1 ml-2  rounded'
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
        <button
          className=' border-2  p-1 ml-3  rounded'
          onClick={handleExportExcel}
        >
          Export Excel
        </button>
        <button
          className=' border-2  p-1 ml-3 rounded'
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
      </div>

      <div ref={reportRef} className='p-3 bg-white shadow border'>
        <ExcelHeader />

        {/* The report to export */}
        <div
          id='report'
          ref={reportRef}
          className='bg-white shadow-md mt-1 rounded-lg overflow-hidden'
        >
          {/* ====== TABLE 1 ====== */}
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse '>
              <thead>
                <tr className='bg-blue-50'>
                  <th colSpan='6' className='py-3 text-center border'>
                    <b className='text-lg'>
                      VALUATION REPORT <br />
                      FOR <br />
                      HOME FIRST FINANCE COMPANY (HFFC){" "}
                      <span className='text-blue-600'>(WWW.HFFC.IN)</span>
                    </b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan='8' className='border px-4 py-2 text-center'>
                    1
                  </td>
                  <td
                    className='text-red-500 text-center font-bold border px-4 py-2'
                    colSpan='5'
                  >
                    L & T ASSIGNMENT DETAILS
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Customer Name</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.customerName || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Date of Report</td>
                  <td className='font-bold border px-4 py-2'>
                    {reportData?.dateOfReport || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Property Name</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.propertyName || "NA"}
                  </td>
                  <td className='border px-4 py-2'>Ref No.</td>
                  <td className='border px-4 py-2'>
                    {reportData?.refNo || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Customer No.</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.customerNo || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Evaluation Type</td>
                  <td className='border px-4 py-2'>
                    {reportData?.evaluationType || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Person Met during visit</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.personMetDuringVisit || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Unit Type</td>
                  <td className='border px-4 py-2'>
                    {reportData?.unitType || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Person Contact No.</td>
                  <td colSpan='4' className='border px-4 py-2'>
                    {reportData?.personContactNo || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Type of Loan</td>
                  <td colSpan='4' className='border px-4 py-2'>
                    {reportData?.typeOfLoan || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>
                    Documents Available for perusal
                  </td>
                  <td
                    colSpan='4'
                    className='border px-4 py-2 text-red-500 text-center'
                  >
                    <b>{reportData?.documentsAvailable || "N/A"}</b>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ====== TABLE 2: GENERAL DETAILS ====== */}
            <table className='w-full border-collapse'>
              <thead>
                <tr>
                  <th
                    colSpan='5'
                    className='text-red-500 text-center font-bold border px-4 py-2'
                  >
                    GENERAL DETAILS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border px-4 py-2'>
                    Address as per Legal Document
                  </td>
                  <td colSpan='4' className='border px-4 py-2 font-bold'>
                    {reportData?.addressLegal || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Address As per Site</td>
                  <td colSpan='4' className='border px-4 py-2 font-bold'>
                    {reportData?.addressSite || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>
                    Nearby landmark (within 500m)
                  </td>
                  <td className='border px-4 py-2'>
                    {reportData?.nearbyLandmark || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Project Pin Code</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.projectPinCode || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Zone</td>
                  <td className='border px-4 py-2'>
                    {reportData?.zone || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Project State</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.projectState || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Name on society board:</td>
                  <td className='border px-4 py-2'>
                    {reportData?.nameOnSocietyBoard || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>
                    Name on door of the premises
                  </td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.nameOnDoor || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Latitude</td>
                  <td className='border px-4 py-2 font-bold'>
                    {reportData?.latitude || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Longitude</td>
                  <td colSpan='2' className='border px-4 py-2 font-bold'>
                    {reportData?.longitude || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>
                    Population as per Census 2011
                  </td>
                  <td className='border px-4 py-2'>
                    {reportData?.populationCensus2011 || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Rural/ Urban</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.ruralUrban || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Status of Occupancy</td>
                  <td className='border px-4 py-2'>
                    {reportData?.statusOfOccupancy || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Occupied by</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.occupiedBy || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Usage of the property</td>
                  <td colSpan='4' className='border px-4 py-2'>
                    {reportData?.usageOfProperty || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>RERA (If applicable)</td>
                  <td className='border px-4 py-2'>
                    {reportData?.eraApplicable || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>Number & Date</td>
                  <td colSpan='2' className='border px-4 py-2'>
                    {reportData?.numberAndDate || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className='border px-4 py-2'>Ownership Type</td>
                  <td colSpan='4' className='border px-4 py-2'>
                    {reportData?.ownershipType || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ====== TABLE 3: DOCUMENT DETAILS ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  DOCUMENT DETAILS
                </th>
              </tr>
              <tr>
                <th className='border px-4 py-2 font-bold'>TYPE</th>
                <th className='border px-4 py-2 font-bold'>
                  Approving Authority / Applicability
                </th>
                <th className='border px-4 py-2 font-bold'>
                  Date of approval and Number
                </th>
                <th colSpan='2' className='border px-4 py-2 font-bold'>
                  Details of the approval.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>NA Converted</td>
                <td className='border px-4 py-2'>{reportData?.naConverted}</td>
                <td className='border px-4 py-2'>Number & Date</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.numberAndDate}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Approved Sanction Plan</td>
                <td className='border px-4 py-2'>{reportData?.sanctionPlan}</td>
                <td className='border px-4 py-2'>Number & Date</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.sanctionDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Approved Layout Plan</td>
                <td className='border px-4 py-2'>{reportData?.layoutPlan}</td>
                <td className='border px-4 py-2'>Number & Date</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.layoutDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Commencement Certificate (If any)
                </td>
                <td className='border px-4 py-2'>{reportData?.commencement}</td>
                <td className='border px-4 py-2'>Number & Date</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.commencementDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Occupancy/ Completion/ Building usage certificate
                </td>
                <td className='border px-4 py-2'>{reportData?.occupancy}</td>
                <td className='border px-4 py-2'>Number & Date</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.occupancyDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Approved Sub Plotting Plan</td>
                <td className='border px-4 py-2'>{reportData?.subPlotting}</td>
                <td className='border px-4 py-2'>Number & Date</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.subPlottingDetails}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====== TABLE 4: LOCALITY DETAILS ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  LOCALITY DETAILS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>Locality Development</td>
                <td className='border px-4 py-2'>
                  {reportData?.localityDevelopment}
                </td>
                <td className='border px-4 py-2'>
                  Occupancy of Project/Area (%)
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.occupancyPercentage}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Type of Approach Road</td>
                <td className='border px-4 py-2'>
                  {reportData?.approachRoadType}
                </td>
                <td className='border px-4 py-2'>
                  Habitation in surrounding Area (%)
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.habitationPercentage}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Approach Road Width (In Feet)
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.approachRoadWidth}
                </td>
                <td className='border px-4 py-2'>Proposed Road Widening</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.proposedRoadWidening}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Distance from city centre (in KM)
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.distanceFromCityCentre}
                </td>
                <td className='border px-4 py-2'>
                  Name of City Centre Considered
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.cityCentreName}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Distance from Railway Station (in KM)
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.distanceFromRailwayStation}
                </td>
                <td className='border px-4 py-2'>Drainage Line connection</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.drainageLine}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Distance from Bus Stand (in KM)
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.distanceFromBusStand}
                </td>
                <td className='border px-4 py-2'>
                  Water & Electricity Supply Connection
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.waterElectricitySupply}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Distance from Hospital (in KM)
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.distanceFromHospital}
                </td>
                <td className='border px-4 py-2'>
                  Nallah, River, High tension line if any
                </td>
                <td colSpan='2' className='border px-4 py-2 font-bold'>
                  {reportData?.nallahRiverHighTension}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====== TABLE 5: NDMA GUIDELINE ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  NDMA GUIDELINE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>
                  Property Falls under Sesimic Zone
                </td>
                <td className='border px-4 py-2'>{reportData?.seismicZone}</td>
                <td className='border px-4 py-2'>
                  Property Falls under Flood Zone
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.floodZone}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Property Falls under Cyclone Zone
                </td>
                <td className='border px-4 py-2'>{reportData?.cycloneZone}</td>
                <td className='border px-4 py-2'>Property Falls in CR Zone</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.crZone}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Property Falls under Landslide Prone Zone
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.landslideZone}
                </td>
                <td className='border px-4 py-2'>Follows NMDA Guidelines</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.followsreportData}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Degree of Risk Associated</td>
                <td className='border px-4 py-2'>{reportData?.riskDegree}</td>
                <td className='border px-4 py-2'>
                  Any Demolition Risk with Details
                </td>
                <td colSpan='2' className='border px-4 py-2 font-bold'>
                  {reportData?.demolitionRisk}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====== TABLE 6: PROPERTY DETAILS ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  PROPERTY DETAILS
                </th>
              </tr>
              <tr>
                <th rowSpan='5' className='border px-4 py-2'>
                  Boundaries on Site
                </th>
                <th className='border px-4 py-2 font-bold'>Directions</th>
                <th className='border px-4 py-2 font-bold'>
                  As per Document/ATS
                </th>
                <th className='border px-4 py-2 font-bold'>Actual at site</th>
                <th className='border px-4 py-2 font-bold'>As per plan</th>
              </tr>
            </thead>
            <tbody className='border'>
              {["North", "South", "East", "West"].map((direction) => (
                <tr key={direction}>
                  <td className='border px-4 py-2 font-bold'>{direction}</td>
                  <td className='border px-4 py-2 font-bold'>
                    {reportData?.directions?.[direction] || "N/A"}
                  </td>
                  <td className='border px-4 py-2 font-bold'>
                    {reportData?.directions?.[direction] || "N/A"}
                  </td>
                  <td className='border px-4 py-2'>NA</td>
                </tr>
              ))}
              <tr>
                <td className='border px-4 py-2'>Boundaries Matching</td>
                <td className='border px-4 py-2'>
                  {reportData?.boundariesMatching || "N/A"}
                </td>
                <td className='border px-4 py-2'>If No - Detail Remark</td>
                <td className='border px-4 py-2'>NA</td>
                <td className='border px-4 py-2'>Dimension:</td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Plot Area (Sq. ft)</td>
                <td className='border px-4 py-2'>
                  {reportData?.plotArea || "N/A"}
                </td>
                <td className='border px-4 py-2'>Property is Demarcated</td>
                <td className='border px-4 py-2'>
                  {reportData?.isPropertyDemarcated || "Yes"}
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.dimension || "30 * 30"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Is the property within which limit
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.isPropertyWithinLimit || "N/A"}
                </td>
                <td className='border px-4 py-2'>
                  Property Easily Identifiable
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.propertyIdentifiable || "If no, Remarks:"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Marketability</td>
                <td className='border px-4 py-2'>
                  {reportData?.marketability || "Good/ Average/ Poor"}
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.marketability ? "Yes" : "N/A"}
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  NA
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====== TABLE 7: STRUCTURAL DETAILS ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  STRUCTURAL DETAILS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>Type of Structure</td>
                <td className='border px-4 py-2'>
                  {reportData?.typeOfStructure || "NA"}
                </td>
                <td className='border px-4 py-2'>Quality of Construction</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.qualityOfConstruction}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Unit / Flat Configuration</td>
                <td className='border px-4 py-2'>
                  {reportData?.unitFlatConfiguration || "NA"}
                </td>
                <td className='border px-4 py-2'>
                  If quality of construction is poor
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.poorConstructionDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>No. Of Floors Permissible</td>
                <td className='border px-4 py-2'>
                  {reportData?.noOfFloorsPermissible || "NA"}
                </td>
                <td className='border px-4 py-2'>No. Of Floors Actual</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.noOfFloorsActual}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  No. of Unit / Flat on each Floor
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.noOfUnitFlatOnEachFloor || "NA"}
                </td>
                <td className='border px-4 py-2'>
                  Internal composition of the property
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.internalComposition}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Approx. Age of Property (Years)
                </td>
                <td className='border px-4 py-2'>
                  {reportData?.approxAgeOfProperty || "0"}
                </td>
                <td className='border px-4 py-2'>
                  Whether construction is as per plan / permission / building by
                  laws
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.constructionAsPerPlan}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Residual Age (Years)</td>
                <td className='border px-4 py-2'>
                  {reportData?.residualAge || "50"}
                </td>
                <td className='border px-4 py-2'>
                  Current Construction Status (in % only)
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.constructionStatus}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Whether Lift Available</td>
                <td className='border px-4 py-2'>
                  {reportData?.liftAvailable || "No"}
                </td>
                <td className='border px-4 py-2'>
                  Height of the building (Approx in Meters)
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.buildingHeight}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Construction stage</td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.constructionStage || "Plinth"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====== TABLE 8: VIOLATION & VALUATION ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  VIOLATION OBSERVED, IF ANY
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>Deviation to Plan</td>
                <td className='border px-4 py-2'>
                  {reportData?.deviationToPlan}
                </td>
                <td className='border px-4 py-2'>If yes</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.deviationDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Demolition Risk</td>
                <td className='border px-4 py-2'>
                  {reportData?.demolitionRisk}
                </td>
                <td className='border px-4 py-2'>If yes</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.demolitionDetails}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Encroachment of Land</td>
                <td className='border px-4 py-2'>{reportData?.encroachment}</td>
                <td className='border px-4 py-2'>If yes</td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.encroachmentDetails}
                </td>
              </tr>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  VALUATION
                </th>
              </tr>
              <tr>
                <td rowSpan='3' className='border px-4 py-2'>
                  Land area (Sq. ft)
                </td>
                <td className='border px-4 py-2'>Document</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.document || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Plan</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.landAreaPlan || "0"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Site</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.landAreaSite || "N/A"}
                </td>
              </tr>
              <tr>
                <td rowSpan='3' className='border px-4 py-2'>
                  Built Up Area (Proposed)
                </td>
                <td className='border px-4 py-2'>GF</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.landAreaGF || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>FF</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.builtUpAreaFF || "0"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>SF</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.builtUpAreaSF || "0"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Land Area considered for Valuation
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  Deed / ATS
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.landAreaForValuation || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Land Rate considered per sq. Ft.
                </td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.landRate || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Total Land Valuation</td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.totalLandValuation || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Construction Area considered for Valuation
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  Plan
                </td>
                <td colSpan='2' className='border px-4 py-2'>
                  {reportData?.landAreaGF || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Construction Rate considered per sq. Ft
                </td>
                <td className='border px-4 py-2'>BUA</td>
                <td colSpan='3' className='border px-4 py-2'>
                  {reportData?.constructionRate || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Total Construction Valuation
                </td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.totalConstructionValuation || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Fair Market Value / Total Value of the unit after completion
                </td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.fairMarketValue || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>Valuation at Present Stage</td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.presentStageValuation || "N/A"}
                </td>
              </tr>
              <tr>
                <td className='border px-4 py-2'>
                  Valuation as per Govt. Guideline
                </td>
                <td colSpan='4' className='border px-4 py-2'>
                  {reportData?.govtGuidelineValuation || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====== TABLE 9: OBSERVATIONS ====== */}
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th
                  colSpan='5'
                  className='text-red-500 text-center font-bold border px-4 py-2'
                >
                  OBSERVATION AND REMARKS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan='5' className='border px-4 py-2'>
                  {Array.isArray(observations)
                    ? observations.map((obs, index) => (
                        <React.Fragment key={index}>
                          <p className='mb-2'>
                            {index + 1}.{" "}
                            <span dangerouslySetInnerHTML={{ __html: obs }} />
                          </p>
                        </React.Fragment>
                      ))
                    : observations}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HFBankDetails;
