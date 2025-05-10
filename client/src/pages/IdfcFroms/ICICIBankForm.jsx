

import React, { useState } from 'react';
import Request from './RequestForm';
import Docomentfrom from './DocumentForm'
import PropertyAndnunits from "./PropertyAndUnitDetailsForm";
import NdmaAndValuation from "./NdmaAndValuation";
import Floorwise from "./FloorwiseBuildingUsageDetails"
// / / Import the Request component

import UploadAndSiteVisitForm from './UploadAndSiteVisitForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIciciHFCBank } from '../../redux/features/IciciHfCBank/IciciHFCBankThunk';

const ICICIBankForm = () => {
  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   console.log(collectedData, "cccccccc")

  const handleNext = async (formData) => {
    const updatedData = {
      ...collectedData,
      [`step${step}`]: formData,
    };

    setCollectedData(updatedData);

    if (step === 5) {
      const finalData = {
        ...updatedData.step1,
        ...updatedData.step2,
        ...updatedData.step3,
        ...updatedData.step4,
        ...updatedData.step5,
      };
  console.log(finalData, "cccccccc")



      try {
        const response = await dispatch(createIciciHFCBank(finalData)).unwrap();
        navigate(`/bank/icici-hfc/${response._id}`);
      } catch (error) {
        console.error("Submission failed:", error);
        alert("❌ Submission failed. Please try again.");
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">ICICI Valuation Report</h3>
      <p className="text-gray-600 mb-4">Step {step <= 5 ? step : 5} of 5</p>

      
      {step === 1 && <Request onNext={handleNext} />}
      {step === 2 && <UploadAndSiteVisitForm onNext={handleNext} />}
      {step === 3 && <Docomentfrom onNext={handleNext} />}
      {step === 4 && <PropertyAndnunits onNext={handleNext} />}
      {step === 5 && <NdmaAndValuation onNext={handleNext} />}
      {step === 6 && <Floorwise onNext={handleNext} />}

      {step > 5 && (
        <div className="text-green-600 font-semibold">
          ✅ All steps completed. Form submitted.
        </div>
      )}
    </div>
  );
};

export default ICICIBankForm;
