import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValuationReport from "./Form/ValuationReport";
import GeneralDetails from "./Form/GeneralDetails";
import PropertyDetails from "./Form/PropertyDetails";
import ValuationDetails from "./Form/ValuationDetails";
import { createHFBanks } from "../../../redux/features/HFBank/HFBankThunk";
import { useNavigate } from "react-router-dom";

const HomeFirstBank = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.hfBanks);

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});
  console.log(collectedData, "DATA");

  const handleNext = async (formData) => {
    const updatedData = {
      ...collectedData,
      [`step${step}`]: formData,
    };

    setCollectedData(updatedData);

    if (step === 4) {
      const finalData = {
        ...updatedData.step1,
        ...updatedData.step2,
        ...updatedData.step3,
        ...updatedData.step4,
      };

      try {
        const response = await dispatch(createHFBanks(finalData)).unwrap();

        // Navigate to details page with data + id
        navigate(`/bank/home-first/${response._id}`);
      } catch (err) {
        console.error("Submission failed:", err);
      }
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className='bg-gray-100 py-2 px-2'>
      <div className='max-w-6xl mx-auto bg-white shadow rounded p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold'>Bank Report Form</h1>
          <p className='text-gray-500'>Step {step <= 4 ? step : 4} of 4</p>
        </div>

        {step === 1 && <ValuationReport onNext={handleNext} />}
        {step === 2 && <GeneralDetails onNext={handleNext} />}
        {step === 3 && <PropertyDetails onNext={handleNext} />}
        {step === 4 && <ValuationDetails onNext={handleNext} />}

        {step > 4 && (
          <div className='text-green-600 font-semibold'>
            ✅ All steps completed. Form submitted.
          </div>
        )}

        {loading && <p className='text-blue-600'>Submitting...</p>}
        {error && <p className='text-red-600'>Error: {error}</p>}
      </div>
    </div>
  );
};

export default HomeFirstBank;
