import React, { useState } from "react";
import toast from "react-hot-toast";

const BasicDetail = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: "",
    propertyCategory: "",
    propertySubCategory: "",
    greenHousing: "",
    certificationType: "",
    address: "",
    flatNo: "",
    floorWing: "",
    buildingName: "",
    khasraNumber: "",
    streetName: "",
    landmark: "",
    village: "",
    city: "",
    district: "",
    pincode: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
    addressMatching: "",
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

    onNext(formData); // Pass the form data to the parent component

    // console.log("Submitted Data:", formData);

    setFormData({
      applicantName: "",
      propertyCategory: "",
      propertySubCategory: "",
      greenHousing: "",
      certificationType: "",
      address: "",
      flatNo: "",
      floorWing: "",
      buildingName: "",
      khasraNumber: "",
      streetName: "",
      landmark: "",
      village: "",
      city: "",
      district: "",
      pincode: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
      addressMatching: "",
    });
    toast.success("saved successfully!");
  };

  return (
    <div className='container mx-auto mt-2 px-4 max-w-4xl'>
      {/* Header + Edit Button */}
      <div
        className='flex justify-between items-center text-white p-3 rounded-md cursor-pointer bg-[#365069]'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className='m-0 text-lg font-semibold'>Address Form</h4>
        <button className='px-3 py-1 bg-white text-[#365069] rounded text-sm font-medium hover:bg-gray-100'>
          {isOpen ? "Close" : "Edit"}
        </button>
      </div>

      {/* Form Accordion */}
      <div className={`mt-3 ${isOpen ? "" : "hidden"}`}>
        <div className='bg-white rounded-md shadow-sm'>
          <div className='p-4'>
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "Applicant's Name / Owner Name",
                  name: "applicantName",
                },
                { label: "Property Category", name: "propertyCategory" },
                { label: "Property Sub-Category", name: "propertySubCategory" },
                {
                  label: "Type and Level of Certification",
                  name: "certificationType",
                },
                { label: "Address as per Provided Documents", name: "address" },
                { label: "Flat No/Block No/Shop No", name: "flatNo" },
                { label: "Floor Number & Wing Name", name: "floorWing" },
                { label: "Building/House/Shop Name", name: "buildingName" },
                { label: "CTS/Survey/Khasra Number", name: "khasraNumber" },
                { label: "Street Name", name: "streetName" },
                { label: "Landmark", name: "landmark" },
                { label: "Village/Location", name: "village" },
                { label: "City/Taluka/Town", name: "city" },
                { label: "District", name: "district" },
                { label: "Pincode", name: "pincode" },
                { label: "State", name: "state" },
                { label: "Country", name: "country" },
                { label: "Latitude", name: "latitude" },
                { label: "Longitude", name: "longitude" },
              ].map((field, index) => (
                <div className='mb-4' key={index}>
                  <label className='block text-sm font-semibold mb-1'>
                    {field.label}:
                  </label>
                  <input
                    type='text'
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#365069]'
                    placeholder={`Enter ${field.label}`}
                  />
                </div>
              ))}

              {/* Yes/No Select Dropdown for "If Green Housing" */}
              <div className='mb-4'>
                <label className='block text-sm font-semibold mb-1'>
                  If Green Housing:
                </label>
                <select
                  name='greenHousing'
                  value={formData.greenHousing}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#365069]'
                >
                  <option value=''>Select</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>

              {/* Yes/No Select Dropdown for "Address Matching" */}
              <div className='mb-4'>
                <label className='block text-sm font-semibold mb-1'>
                  Address Matching:
                </label>
                <select
                  name='addressMatching'
                  value={formData.addressMatching}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#365069]'
                >
                  <option value=''>Select</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>

              <button
                type='submit'
                className='px-4 py-2 bg-[#365069] text-white font-bold rounded-md hover:bg-[#2a4058]'
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetail;
