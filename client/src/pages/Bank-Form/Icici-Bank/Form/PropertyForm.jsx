// import React, { useState } from "react";
// import { Input, Select, Button } from "antd";
// import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

// const { Option } = Select;

// const PropertyForm = ({ onNext }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [formData, setFormData] = useState({
//     address: "",
//     plotArea: "",
//     countOfProperties: "",
//     societyRegistered: "",
//     valuerName: "",
//     valuationDate: "",
//     lat: "",
//     long: "",
//     customerName: "",
//     customerPanNo: "",
//     customerMobileNo: "",
//     customerAddress: "",
//     affFlag: "",
//     doorPhotoWithNamePlate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = {
//       ...formData,
//       plotArea: Number(formData.plotArea),
//       countOfProperties: Number(formData.countOfProperties),
//       societyRegistered: formData.societyRegistered === "true",
//       affFlag: formData.affFlag === "true",
//       doorPhotoWithNamePlate: formData.doorPhotoWithNamePlate === "true",
//     };
//     onNext(updatedData);
//   };

//   return (
//     <div className='w-full px-4 py-4'>
//       {/* Collapsible Header */}
//       <div
//         className='flex items-center justify-between bg-red-800 text-white p-4 rounded-lg cursor-pointer'
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h2 className='text-lg font-semibold'>Property Details</h2>
//         {isOpen ? <ChevronUp /> : <ChevronDown />}
//       </div>

//       {/* Collapsible Form */}
//       {isOpen && (
//         <form onSubmit={handleSubmit} className='mt-4 space-y-6'>
//           <div className='grid md:grid-cols-2 gap-4'>
//             <Input
//               name='address'
//               value={formData.address}
//               onChange={handleChange}
//               placeholder='Address'
//             />
//             <Input
//               type='number'
//               name='plotArea'
//               value={formData.plotArea}
//               onChange={handleChange}
//               placeholder='Plot Area (sq.ft.)'
//             />
//             <Input
//               type='number'
//               name='countOfProperties'
//               value={formData.countOfProperties}
//               onChange={handleChange}
//               placeholder='Number of Properties'
//             />
//             <Select
//               placeholder='Society Registered?'
//               value={formData.societyRegistered}
//               onChange={(value) =>
//                 handleSelectChange("societyRegistered", value)
//               }
//             >
//               <Option value='true'>Yes</Option>
//               <Option value='false'>No</Option>
//             </Select>
//             <Input
//               name='valuerName'
//               value={formData.valuerName}
//               onChange={handleChange}
//               placeholder='Valuer Name'
//             />
//             <Input
//               type='date'
//               name='valuationDate'
//               value={formData.valuationDate}
//               onChange={handleChange}
//               placeholder='Valuation Date'
//             />
//             <Input
//               name='lat'
//               value={formData.lat}
//               onChange={handleChange}
//               placeholder='Latitude'
//             />
//             <Input
//               name='long'
//               value={formData.long}
//               onChange={handleChange}
//               placeholder='Longitude'
//             />
//           </div>

//           <div className='grid md:grid-cols-2 gap-4'>
//             <Input
//               name='customerName'
//               value={formData.customerName}
//               onChange={handleChange}
//               placeholder='Customer Name'
//             />
//             <Input
//               name='customerPanNo'
//               value={formData.customerPanNo}
//               onChange={handleChange}
//               placeholder='Customer PAN No'
//             />
//             <Input
//               name='customerMobileNo'
//               value={formData.customerMobileNo}
//               onChange={handleChange}
//               placeholder='Customer Mobile No'
//             />
//             <Input.TextArea
//               name='customerAddress'
//               value={formData.customerAddress}
//               onChange={handleChange}
//               placeholder='Customer Address'
//               rows={3}
//             />
//             <Select
//               placeholder='Is Property AFF marked?'
//               value={formData.affFlag}
//               onChange={(value) => handleSelectChange("affFlag", value)}
//             >
//               <Option value='true'>Yes</Option>
//               <Option value='false'>No</Option>
//             </Select>
//             <Select
//               placeholder='Door Photo with Name Plate?'
//               value={formData.doorPhotoWithNamePlate}
//               onChange={(value) =>
//                 handleSelectChange("doorPhotoWithNamePlate", value)
//               }
//             >
//               <Option value='true'>Yes</Option>
//               <Option value='false'>No</Option>
//             </Select>
//           </div>

//           <div className='flex justify-end'>
//             <Button
//               type='primary'
//               htmlType='submit'
//               icon={<ArrowRight className='mr-2' size={16} />}
//               className='bg-red-800 hover:bg-red-700'
//             >
//               Save & Next
//             </Button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PropertyForm;

import React, { useState } from "react";

const PropertyForm = ({ onNext }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    pincode: "453115",
    state: "Madhya Pradesh",
    city: "Indore",
    district: "Indore",
    locality: "NA",
    streetName: "NA",
    landmark: "NA",
    plotNo: "B-42",
    propertyType: "Residential",
    unitType: "Plot",
    revenueRecordType:
      "PLOT NO. B-42 FAMOUS VILLA VILLAGE TAKHEDI, TEHSIL DEPALPUR, DIST. INDORE",
    sanctionUsage: "Residential",
    actualUsage: "Residential",
    plotArea: 1275,
    propertyJurisdiction: "Gram Panchayat",
    sanctionAuthorityName: "GP",
    societyRegistered: false,
    uniquePropertyID: "01000",
    propertyEntranceFacing: "East",
    affFlag: false,
    propertyTransactionType: "Resale (Others)",
    countOfProperties: 1,
    doorPhotoWithNamePlate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Pass the form data to the next step
    alert("Form submitted successfully!");
    setIsEditOpen(false);
  };

  const toggleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    <div className='container mx-auto mt-4 max-w-6xl'>
      <div
        className='p-3 border rounded cursor-pointer'
        style={{ backgroundColor: "#98291E" }}
        onClick={toggleEdit}
      >
        <div className='flex justify-between items-center text-white'>
          <h4 className='m-0 text-lg font-semibold'>Property Details</h4>
          <button
            type='button'
            className='bg-white text-gray-800 px-3 py-1 rounded text-sm'
            onClick={(e) => {
              e.stopPropagation();
              toggleEdit();
            }}
          >
            {isEditOpen ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      {isEditOpen && (
        <div className='border rounded p-3 mt-2 bg-white'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>Pincode:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='pincode'
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>State:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>City:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>District:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='district'
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>Locality:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='locality'
                  value={formData.locality}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Street Name & No.:
                </label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='streetName'
                  value={formData.streetName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>Landmark:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='landmark'
                  value={formData.landmark}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>Plot No.:</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='plotNo'
                  value={formData.plotNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>
                  Property Type:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='propertyType'
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value='Non Residential'>Non Residential</option>
                  <option value='Residential'>Residential</option>
                </select>
              </div>
              <div>
                <label className='block mb-2 font-semibold'>Unit Type:</label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='unitType'
                  value={formData.unitType}
                  onChange={handleChange}
                >
                  <option value='Plot'>Plot</option>
                </select>
              </div>
            </div>

            <div className='mb-4'>
              <label className='block mb-2 font-semibold'>
                Revenue Record Type & Number:
              </label>
              <input
                type='text'
                className='w-full p-2 border border-gray-300 rounded'
                name='revenueRecordType'
                value={formData.revenueRecordType}
                onChange={handleChange}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>
                  Sanction Usage:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='sanctionUsage'
                  value={formData.sanctionUsage}
                  onChange={handleChange}
                >
                  <option value='Residential'>Residential</option>
                </select>
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Actual Usage:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='actualUsage'
                  value={formData.actualUsage}
                  onChange={handleChange}
                >
                  <option value='Residential'>Residential</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>
                  Plot Area (Sqft):
                </label>
                <input
                  type='number'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='plotArea'
                  value={formData.plotArea}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Property Jurisdiction:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='propertyJurisdiction'
                  value={formData.propertyJurisdiction}
                  onChange={handleChange}
                >
                  <option value='Gram Panchayat'>Gram Panchayat</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>
                  Sanction Authority Name:
                </label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='sanctionAuthorityName'
                  value={formData.sanctionAuthorityName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Society Registered:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='societyRegistered'
                  value={formData.societyRegistered}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>
                  Unique Property ID:
                </label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='uniquePropertyID'
                  value={formData.uniquePropertyID}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Property Entrance Facing:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='propertyEntranceFacing'
                  value={formData.propertyEntranceFacing}
                  onChange={handleChange}
                >
                  <option value='East'>East</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>AFF Flag:</label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='affFlag'
                  value={formData.affFlag}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Property Transaction Type:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='propertyTransactionType'
                  value={formData.propertyTransactionType}
                  onChange={handleChange}
                >
                  <option value='Resale (Others)'>Resale (Others)</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block mb-2 font-semibold'>
                  Count Of Properties:
                </label>
                <input
                  type='number'
                  className='w-full p-2 border border-gray-300 rounded'
                  name='countOfProperties'
                  value={formData.countOfProperties}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='block mb-2 font-semibold'>
                  Door Photo With Name Plate:
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded'
                  name='doorPhotoWithNamePlate'
                  value={formData.doorPhotoWithNamePlate}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                style={{ background: "#98291E" }}
                type='submit'
                className='text-white px-4 py-2 rounded'
              >
                Save & Next
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertyForm;
