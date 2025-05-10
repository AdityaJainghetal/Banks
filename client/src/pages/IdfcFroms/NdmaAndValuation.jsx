import React, { useState } from 'react';

const NdmaAndValuation = ({ onNext }) => {
  const [formData, setFormData] = useState({
    heightOfBuilding: 'Less than 15 meter',
    floodProneArea: 'No',
    seismicZone: '4',
    crz: '1',
    occupancyStatus: 'VACANT',
    customerRelationWithOccupant: 'VACANT LAND',
    occupiedSince: 'LAND',
    rates: [
      { description: 'LANDAREA', area: 882, ratePerSqFt: '', amount: '' },
      { description: 'CARPET AREA', area: 494, ratePerSqFt: '', amount: '' },
      { description: 'SUPER BUILT UP/SELLABLE AREA', area: 617, ratePerSqFt: '', amount: '' },
      { description: 'OTHER 1', area: 1, ratePerSqFt: '', amount: '' },
      { description: 'OTHER 2', area: 1, ratePerSqFt: '', amount: '' }
    ],
    realizableValue: '0',
    totalValueInWords: '',
    landArea: 882,
    landAreaRate: '1',
    constructedArea: 617,
    constructedRate: 1115,
    totalValue: 687955
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRateChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRates = [...formData.rates];
    updatedRates[index][name] = value;

    // Optional: Auto calculate amount if ratePerSqFt and area are filled
    if (name === 'ratePerSqFt' || name === 'area') {
      const area = parseFloat(updatedRates[index].area) || 0;
      const rate = parseFloat(updatedRates[index].ratePerSqFt) || 0;
      updatedRates[index].amount = (area * rate).toFixed(2);
    }

    setFormData((prevData) => ({
      ...prevData,
      rates: updatedRates,
    }));
  };

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <div className="p-4 bg-orange-100 border border-gray-300 rounded-md">
      <h2 className="text-red-700 font-bold text-lg mb-4">NDMA and Valuation Details</h2>

      <form className="space-y-6">
        <div>
          <h3 className="text-red-700 font-semibold mb-2">NDMA Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Height of Building (Above Ground Level)</label>
              <input type="text" name="heightOfBuilding" value={formData.heightOfBuilding} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Flood Prone Area</label>
              <input type="text" name="floodProneArea" value={formData.floodProneArea} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Seismic Zone</label>
              <input type="text" name="seismicZone" value={formData.seismicZone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">CRZ</label>
              <input type="text" name="crz" value={formData.crz} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-red-700 font-semibold mb-2">Occupancy Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Status of Occupancy</label>
              <select name="occupancyStatus" value={formData.occupancyStatus} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="VACANT">VACANT</option>
                <option value="OCCUPIED">OCCUPIED</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Customer Relation With Occupant</label>
              <select name="customerRelationWithOccupant" value={formData.customerRelationWithOccupant} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="VACANT LAND">VACANT LAND</option>
                <option value="OWNER">OWNER</option>
                <option value="TENANT">TENANT</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium">Occupied Since</label>
              <input type="text" name="occupiedSince" value={formData.occupiedSince} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-red-700 font-semibold mb-2">Valuation</h3>
          {formData.rates.map((rate, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
              <input type="text" name="description" value={rate.description} onChange={(e) => handleRateChange(e, index)} placeholder="Description" className="border rounded px-3 py-2" />
              <input type="text" name="area" value={rate.area} onChange={(e) => handleRateChange(e, index)} placeholder="Area (Sq. Ft.)" className="border rounded px-3 py-2" />
              <input type="text" name="ratePerSqFt" value={rate.ratePerSqFt} onChange={(e) => handleRateChange(e, index)} placeholder="Rate (Per Sq. Ft.)" className="border rounded px-3 py-2" />
              <input type="text" name="amount" value={rate.amount} onChange={(e) => handleRateChange(e, index)} placeholder="Amount" className="border rounded px-3 py-2" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Realizable Value</label>
            <input type="text" name="realizableValue" value={formData.realizableValue} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Total Value In Words</label>
            <input type="text" name="totalValueInWords" value={formData.totalValueInWords} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <h3 className="text-red-700 font-semibold mb-2">Valuation as per Govt. Approval</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Land Area/BuiltUp Area/Saleable Area (Sq.Ft)</label>
              <input type="text" name="landArea" value={formData.landArea} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Land Area/BuiltUp Area/Saleable Area Rate (Per Sq. Ft.)</label>
              <input type="text" name="landAreaRate" value={formData.landAreaRate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Constructed Area</label>
              <input type="text" name="constructedArea" value={formData.constructedArea} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium">Constructed Rate</label>
              <input type="text" name="constructedRate" value={formData.constructedRate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium">Total Value</label>
              <input type="text" name="totalValue" value={formData.totalValue} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>
      </form>

      <button
        className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-4"
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
  );
};

export default NdmaAndValuation;
