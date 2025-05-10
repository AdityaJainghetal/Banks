import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import IndividualValuation from "./Form/IndividualValuation";
import BasicDetail from "./Form/BasicDetail";
import AreaDetails from "./Form/AreaDetails";
import Boundaries from "./Form/Boundaries";
import SurroundingLocality from "./Form/SurroundingLocality";
import SanctionPlan from "./Form/SanctionPlan";
import PropertyDetails from "./Form/PropertyDetails";
import NdmaParameters from "./Form/NdmdParameters";
import BuildingDetails from "./Form/BuildingDetails";
import Valuation from "./Form/Valuation";
import StageConstruction from "./Form/StageConstruction";
import OtherValue from "./Form/OtherValue";

import { createDetails } from "../../../redux/features/Primal/piramalThunks";

const Primal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.primal);

  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});

  console.log(collectedData, "Data");
  const handleNext = async (formData) => {
    const updatedData = {
      ...collectedData,
      [`step${step}`]: formData,
    };

    setCollectedData(updatedData);

    if (step === 12) {
      const finalData = {
        ...updatedData.step1,
        ...updatedData.step2,
        ...updatedData.step3,
        ...updatedData.step4,
        ...updatedData.step5,
        ...updatedData.step6,
        ...updatedData.step7,
        ...updatedData.step8,
        ...updatedData.step9,
        ...updatedData.step10,
        ...updatedData.step11,
        ...updatedData.step12,
      };

      try {
        const response = await dispatch(createDetails(finalData)).unwrap();
        navigate(`/bank/piramal/${response._id}`);
        toast.success("Form Submitted successfully!");
      } catch (err) {
        console.error("❌ Submission failed:", err);
      }
    } else {
      setStep((prev) => prev + 1); // Only increment if not on last step
    }
  };

  return (
    <div className='bg-gray-100 py-2 px-2'>
      <div className='max-w-8xl mx-auto bg-white shadow rounded p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold'>Valuation Form</h1>
          <p className='text-gray-500'>Step {step <= 12 ? step : 12} of 12</p>
        </div>

        <BasicDetail onNext={handleNext} />
        <AreaDetails onNext={handleNext} />
        <IndividualValuation onNext={handleNext} />
        <Boundaries onNext={handleNext} />
        <SurroundingLocality onNext={handleNext} />
        <SanctionPlan onNext={handleNext} />
        <PropertyDetails onNext={handleNext} />
        <NdmaParameters onNext={handleNext} />
        <BuildingDetails onNext={handleNext} />
        <Valuation onNext={handleNext} />
        <StageConstruction onNext={handleNext} />
        <OtherValue onNext={handleNext} />

        {step > 12 && (
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

export default Primal;
