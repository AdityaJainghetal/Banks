import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import axios from "../../config/axios";
import ExcelHeader from "../../components/download/ExcelHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsById } from "../../redux/features/AdityaBank/adityaThunks";

const AdityaDetails = () => {
  const reportRef = useRef();
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const reportData = useSelector((state) => state?.aditya.detail);

  useEffect(() => {
    const fetchReportData = async (id) => {
      try {
        dispatch(fetchDetailsById(id));
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData(id);
  }, [formSubmitted, id, dispatch]);

  const handleExportPDF = async () => {
    try {
      const element = reportRef.current;
      if (!element) throw new Error("Report element not found");

      // Fix unsupported colors (like oklch)
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

      // Generate canvas
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2, // decent quality with manageable size
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };

      // Calculate image size in mm
      const pxToMm = (px) => (px * 25.4) / 96; // 96dpi to mm
      const imgWidthMm = pxToMm(imgProps.width);
      const imgHeightMm = pxToMm(imgProps.height);

      // Scale image to fit page width
      const ratio = pdfWidth / imgWidthMm;
      const scaledWidth = imgWidthMm * ratio;
      const scaledHeight = imgHeightMm * ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Aditya_Birla_Valuation_Report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. Check console for details.");
    }
  };

  const handleExportExcel = () => {
    const table = document.getElementById("reportTable");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Report" });
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "AdityaBirlaFinance_Report.xlsx");
  };

  const handleExportCSV = () => {
    const table = document.getElementById("reportTable");
    const worksheet = XLSX.utils.table_to_sheet(table);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "AdityaBirlaFinance_Report.csv");
  };

  if (loading) return <div className='text-center py-8'>Loading...</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
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
          <table id='reportTable' className='w-full border-collapse'>
            <tbody>
              <tr>
                <td
                  colSpan='5'
                  className='bg-gray-100 p-4 text-center font-bold text-lg'
                >
                  Aditya Birla Finance Limited Valuation Report
                </td>
              </tr>
              <tr>
                <td
                  colSpan='5'
                  className='bg-gray-50 p-3 text-center font-semibold'
                >
                  Basic Details
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Name of the Valuer</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.valuerName}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Name of the Client</td>
                <td className='border p-3'>{reportData?.clientName}</td>
                <td className='border p-3 bg-gray-50'>Initiation Date</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.initiationDate}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Vertical</td>
                <td className='border p-3'>{reportData?.vertical}</td>
                <td className='border p-3 bg-gray-50'>Visit Date</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.visitDate}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Case Reference Number</td>
                <td className='border p-3'>
                  {reportData?.caseReferenceNumber}
                </td>
                <td className='border p-3 bg-gray-50'>Report Date</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.reportDate}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Name of the Property Owner
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.propertyOwnerName}
                </td>
              </tr>
              <tr>
                <td
                  colSpan='5'
                  className='bg-gray-50 p-3 text-center font-semibold'
                >
                  Location Details
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Property Address as Per TRF
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.propertyAddressTRF}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Property Address as Per Visit
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.propertyAddressVisit}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Property Address as Per "Docs"
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.propertyAddressDocs}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Main Locality</td>
                <td className='border p-3'>{reportData?.mainLocality}</td>
                <td className='border p-3 bg-gray-50'>Sub Locality</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.subLocality}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Micro Location</td>
                <td className='border p-3'>{reportData?.microLocation}</td>
                <td className='border p-3 bg-gray-50'>Landmark</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.landmark}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Latitude</td>
                <td className='border p-3'>{reportData?.latitude}</td>
                <td className='border p-3 bg-gray-50'>Longitude</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.longitude}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Type of Property</td>
                <td className='border p-3'>{reportData?.typeOfProperty}</td>
                <td className='border p-3 bg-gray-50'>Current Usage</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.currentUsage}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Has the Valuator Done Valuation for this property before?
                </td>
                <td className='border p-3'>{reportData?.valuatorDoneBefore}</td>
                <td className='border p-3 bg-gray-50'>If yes, when</td>
                <td className='border p-3'>{reportData?.ifYesWhen}</td>
                <td className='border p-3'></td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Property Type</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.propertyType}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Property Sub Type</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.propertySubType}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Locality</td>
                <td className='border p-3'>{reportData?.locality}</td>
                <td className='border p-3 bg-gray-50'>
                  Property Falling Within
                </td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.propertyFallingWithin}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Occupancy Level of the Surrounding
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.occupancyLevel}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Condition of the Site of the Property
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.siteCondition}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Distance to Railway/Metro Station
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.distanceToRailway}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Distance to Bus Stop</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.distanceToBusStop}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Distance of Plot from Main Road
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.distanceFromMainRoad}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Distance from City Centre
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.distanceFromCityCentre}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Distance from ABFL Branch
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.distanceFromBranch}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Width of the Approach Road
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.approachRoadWidth}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Dimensions of the Property
                </td>
                <td className='border p-3'>{reportData?.propertyLength}</td>
                <td className='border p-3'>{reportData?.propertyBreadth}</td>
                <td className='border p-3 bg-gray-50'>Depth in Feet</td>
                <td className='border p-3'>{reportData?.propertyDepth}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Physical Approach to the Property
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.physicalApproach}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Legal Approach to the Property
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.legalApproach}
                </td>
              </tr>
              <tr>
                <td colSpan='4' className='border p-3 bg-gray-50'>
                  Any other features like board of other financier...
                </td>
                <td className='border p-3'>{reportData?.otherFeatures}</td>
              </tr>
              <tr>
                <td
                  colSpan='5'
                  className='bg-gray-50 p-3 text-center font-semibold'
                >
                  Property Details
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Occupancy</td>
                <td className='border p-3'>{reportData?.occupancyStatus}</td>
                <td className='border p-3 bg-gray-50'>Occupied By</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.occupiedBy}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Occupied Since</td>
                <td className='border p-3'>{reportData?.occupiedSince}</td>
                <td colSpan='2' className='border p-3 bg-gray-50'>
                  Name of the Occupant
                </td>
                <td className='border p-3'>{reportData?.occupantName}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Property Demarcated</td>
                <td className='border p-3'>{reportData?.propertyDemarcated}</td>
                <td colSpan='2' className='border p-3 bg-gray-50'>
                  Property Identification
                </td>
                <td className='border p-3'>
                  {reportData?.propertyIdentification}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Identification through
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.identificationThrough}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Project Category</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.projectCategory}
                </td>
                <td className='border p-3 bg-gray-50'>Flat Type</td>
                <td className='border p-3'>{reportData?.flatType}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Flat Configuration</td>
                <td className='border p-3'>{reportData?.flatConfiguration}</td>
                <td colSpan='2' className='border p-3 bg-gray-50'>
                  Property Holding
                </td>
                <td className='border p-3'>{reportData?.propertyHolding}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Type of Structure</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.structureType}
                </td>
                <td className='border p-3 bg-gray-50'>Area of PLOT</td>
                <td className='border p-3'>{reportData?.plotArea}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Total No of Floors</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.totalFloors}
                </td>
                <td className='border p-3 bg-gray-50'>Lift Facility</td>
                <td className='border p-3'>{reportData?.liftFacility}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Amenities</td>
                <td className='border p-3'>{reportData?.amenities}</td>
                <td className='border p-3'></td>
                <td className='border p-3 bg-gray-50'>Marketability</td>
                <td className='border p-3'>{reportData?.marketability}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Floor Rise</td>
                <td className='border p-3'>{reportData?.floorRise}</td>
                <td className='border p-3 bg-gray-50'>Type of Property</td>
                <td className='border p-3'>{reportData?.propertyType}</td>
                <td className='border p-3 bg-gray-50'>Property Title</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Document Status</td>
                <td className='border p-3'>{reportData?.documentStatus}</td>
                <td className='border p-3 bg-gray-50'>Encumbrances</td>
                <td className='border p-3'>{reportData?.encumbrances}</td>
                <td className='border p-3 bg-gray-50'>Project Approval</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Legal Title Validity</td>
                <td className='border p-3'>{reportData?.legalTitleValidity}</td>
                <td className='border p-3 bg-gray-50'>Development Status</td>
                <td className='border p-3'>{reportData?.developmentStatus}</td>
                <td className='border p-3 bg-gray-50'>Completion Status</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Carpet Area (as per plan)
                </td>
                <td className='border p-3'>{reportData?.carpetAreaPlan}</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.carpetAreaMeasurement}
                </td>
                <td className='border p-3'>
                  {reportData?.carpetAreaMeasurement}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>
                  Built Up Area (as per Norms)
                </td>
                <td className='border p-3'>{reportData?.builtUpAreaNorms}</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.builtUpAreaMeasurement}
                </td>
                <td className='border p-3'>
                  {reportData?.builtUpAreaMeasurement}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Super Built-Up Area</td>
                <td className='border p-3'>{reportData?.superBuiltUpArea}</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.superBuiltUpArea}
                </td>
                <td className='border p-3'>{reportData?.superBuiltUpArea}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Car Park</td>
                <td className='border p-3'>{reportData?.carPark}</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.carPark}
                </td>
                <td className='border p-3'>{reportData?.carPark}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Amenities</td>
                <td className='border p-3'>{reportData?.amenities}</td>
                <td colSpan='2' className='border p-3'>
                  {reportData?.amenities}
                </td>
                <td className='border p-3'>{reportData?.amenities}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50 font-semibold'>
                  Other Details
                </td>
                <td colSpan='4' className='border p-3'></td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Setbacks</td>
                <td className='border p-3'>As per plan/ Bye laws</td>
                <td className='border p-3'>Actual at site</td>
                <td className='border p-3'>Deviation</td>
                <td className='border p-3'>Remarks, if any</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Front</td>
                <td className='border p-3'>{reportData?.front}</td>
                <td className='border p-3'>0 Ft</td>
                <td rowSpan='4' className='border p-3'>
                  Usage Deviation
                </td>
                <td rowSpan='4' className='border p-3'></td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Side1(Left)</td>
                <td className='border p-3'>{reportData?.side1}</td>
                <td className='border p-3'>0 Ft</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Side2(Right)</td>
                <td className='border p-3'>{reportData?.side2}</td>
                <td className='border p-3'>0 Ft</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Rear</td>
                <td className='border p-3'>{reportData?.rear}</td>
                <td className='border p-3'>0 Ft</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Total Value</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.totalValue}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Distress Value (80%)</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.distressValue}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Insurance Value</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.insuranceValue}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Government Value</td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.governmentValue}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Percentage Completion</td>
                <td className='border p-3'>
                  {reportData?.percentageCompletion}
                </td>
                <td colSpan='2' className='border p-3 bg-gray-50'>
                  Percentage Recommendation
                </td>
                <td className='border p-3'>
                  {reportData?.percentageRecommendation}
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50 font-semibold'>
                  Boundary Detailing
                </td>
                <td colSpan='4' className='border p-3'></td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Detailing</td>
                <td className='border p-3 font-semibold'>North</td>
                <td className='border p-3 font-semibold'>South</td>
                <td className='border p-3 font-semibold'>East</td>
                <td className='border p-3 font-semibold'>West</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>As per docs.</td>
                <td className='border p-3'>{reportData?.north}</td>
                <td className='border p-3'>{reportData?.south}</td>
                <td className='border p-3'>{reportData?.east}</td>
                <td className='border p-3'>{reportData?.west}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>As per Actual</td>
                <td className='border p-3'>{reportData?.north}</td>
                <td className='border p-3'>{reportData?.south}</td>
                <td className='border p-3'>{reportData?.east}</td>
                <td className='border p-3'>{reportData?.west}</td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50'>Boundary Matching</td>
                <td colSpan='4' className='border p-3'>
                  NO
                </td>
              </tr>
              <tr>
                <td className='border p-3 bg-gray-50 font-semibold'>
                  Remarks:
                </td>
                <td colSpan='4' className='border p-3'>
                  {reportData?.remarks}
                </td>
              </tr>
              <tr>
                <td colSpan='2' className='border p-3 bg-gray-50'>
                  Name of the Engineer visited
                </td>
                <td colSpan='3' className='border p-3'>
                  {reportData?.engineerName}
                </td>
              </tr>
              <tr>
                <td colSpan='5' className='border p-3 bg-gray-50'>
                  PHOTOGRAPHS OF PROPERTY
                </td>
              </tr>
              <tr>
                <td colSpan='2' className='border p-3 bg-gray-50'>
                  Subject Property
                </td>
                <td colSpan='3' className='border p-3'>
                  {reportData?.photographs}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdityaDetails;
