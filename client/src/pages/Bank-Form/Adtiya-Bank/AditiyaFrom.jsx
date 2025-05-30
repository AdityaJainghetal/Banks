import React, { useState } from "react";
import BasicDetails from "./Adtiya-From/BasicDetails";
import LocationDetails from "./Adtiya-From/LocationDetails";
import PropertyDetails from "./Adtiya-From/PropertyDetails";
import UnitDetails from "./Adtiya-From/UnitDetails";
import OtherDetails from "./Adtiya-From/OtherDetails";
import BoundaryDetails from "./Adtiya-From/BoundaryDetails";
import { useDispatch } from "react-redux";
import { createDetails } from "../../../redux/features/AdityaBank/adityaThunks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AditiyaFrom = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: data,
    }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = async () => {
    // Flatten all step data into a single object
    const finalData = Object.values(formData).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    try {
      const response = await dispatch(createDetails(finalData)).unwrap();
      toast.success("✅ Form submitted!");
      navigate(`/bank/aditya/${response._id}`);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className='bg-gray-100 py-4 px-4'>
      <div className='max-w-8xl mt-4 mx-auto bg-white shadow rounded p-6'>
        <h1 className='text-2xl font-bold mb-4'>Aditya Bank Report Form</h1>
        <p className='text-gray-500 mb-6'>Step {step} of 6</p>

        {/* Conditional Step Rendering */}
        <BasicDetails onNext={handleNext} />
        <LocationDetails onNext={handleNext} />
        <PropertyDetails onNext={handleNext} />
        <UnitDetails onNext={handleNext} />
        <OtherDetails onNext={handleNext} />
        <BoundaryDetails onNext={handleNext} />

        {step > 6 && (
          <div className='font-semibold'>
            ✅ All steps completed.
            <div className='mt-4'>
              <button
                className='btn border-2 p-2 rounded-2xl hover:bg-[#1E2939] hover:text-white'
                onClick={handleSubmit}
              >
                Submit Report
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className='mt-6 flex justify-between'>
          {step > 1 && step <= 6 && (
            <button className='btn btn-outline-secondary' onClick={handleBack}>
              ⬅ Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AditiyaFrom;
