import React, { useState } from "react";
import toast from "react-hot-toast";

const Valuation = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    landValueArea: "1981",
    landValueRate: "0",
    landValueDepreciation: "0",
    landValueAmount: "0",
    buildingValueArea: "0",
    buildingValueRate: "0",
    buildingValueDepreciation: "0",
    buildingValueAmount: "0",
    improvementArea: "0",
    improvementRate: "0",
    improvementDepreciation: "0",
    improvementAmount: "0",
    amenitiesAvailable: "Na",
    detailsOnInteriors: "Na",
    amenitiesValue: "0",
    fixedInteriorsValue: "0",
    noOfCarParks: "--",
    valueOfCarPark: "--",
    totalValueOfCarParks: "--",
    totalRealisableValue: "₹0",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitted Data:", formData);
    onNext(formData);
    toast.success("saved successfully!");
  };

  return (
    <div className='container mx-auto mt-2 px-4 max-w-4xl'>
      <div
        className='flex justify-between items-center text-white px-4 py-3 rounded cursor-pointer'
        style={{ backgroundColor: "#365069" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className='text-lg font-semibold m-0'>Valuation</h4>
        <button className='bg-white text-sm text-black px-3 py-1 rounded'>
          {isOpen ? "Close" : "Edit"}
        </button>
      </div>

      <div className={`mt-3 ${isOpen ? "" : "hidden"}`}>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {[
            { label: "Land Value Area (sqft/sqmt)", name: "landValueArea" },
            { label: "Land Value Rate (sqft/sqmt)", name: "landValueRate" },
            {
              label: "Land Value Depreciation (%)",
              name: "landValueDepreciation",
            },
            {
              label: "Land Value Amount (in Rs.)",
              name: "landValueAmount",
            },
            {
              label: "Building Value after Depreciation Area",
              name: "buildingValueArea",
            },
            { label: "Building Value Rate", name: "buildingValueRate" },
            {
              label: "Building Value Depreciation",
              name: "buildingValueDepreciation",
            },
            { label: "Building Value Amount", name: "buildingValueAmount" },
            {
              label: "Extension / Improvement Area",
              name: "improvementArea",
            },
            {
              label: "Extension / Improvement Rate",
              name: "improvementRate",
            },
            {
              label: "Extension / Improvement Depreciation",
              name: "improvementDepreciation",
            },
            {
              label: "Extension / Improvement Amount",
              name: "improvementAmount",
            },
            { label: "Amenities Available", name: "amenitiesAvailable" },
            { label: "Details on Interiors", name: "detailsOnInteriors" },
            { label: "Amenities Value", name: "amenitiesValue" },
            { label: "Fixed Interiors Value", name: "fixedInteriorsValue" },
            { label: "No of Car Parks", name: "noOfCarParks" },
            { label: "Value of Car Park", name: "valueOfCarPark" },
            {
              label: "Total Value of Car Parks",
              name: "totalValueOfCarParks",
            },
            {
              label: "Total Realisable Value (in Amt.)",
              name: "totalRealisableValue",
            },
          ].map((field, index) => (
            <div key={index}>
              <label className='block font-medium text-gray-700 mb-1'>
                {field.label}
              </label>
              <input
                type='text'
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-teal-500'
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          <button
            type='submit'
            className='mt-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded'
            style={{ backgroundColor: "#365069" }}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Valuation;
