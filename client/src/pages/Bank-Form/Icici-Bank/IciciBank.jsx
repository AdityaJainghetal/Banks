import React, { useState } from "react";
import { Card } from "antd";
import PropertyForm from "./Form/PropertyForm";
import BoundariesForm from "./Form/BoundariesForm";
import SurroundingAmenitiesForm from "./Form/SurroundingAmenitiesForm";
import CautionAreaForm from "./Form/CautionAreaForm";
import ValuationForm from "./Form/ValuationFom";
import ConstructionProgressForm from "./Form/ConstructionProgressForm";
import DistanceRangeForm from "./Form/DistanceRangeForm";
// import SitePhotographsForm from "./Form/SitePhotographsForm";
import RemarksForm from "./Form/RemarksForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createIciciBank } from "../../../redux/features/IciciBank/iciciBankThunk";

const IciciBank = () => {
  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = async (formData) => {
    const updated = { ...collectedData, [`step${step}`]: formData };
    setCollectedData(updated);

    if (step === 8) {
      const finalData = {
        ...updated.step1,
        ...updated.step2,
        ...updated.step3,
        ...updated.step4,
        ...updated.step5,
        ...updated.step6,
        ...updated.step7,
        ...updated.step8,
      };

      // console.log(finalData, "Final Data to be sent to the server");

      try {
        const response = await dispatch(createIciciBank(finalData)).unwrap();
        navigate(`/bank/icici/${response._id}`);
      } catch (err) {
        console.error("Submission failed:", err);
      }
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className='mb-3 max-w-6xl mt-4 mx-auto'>
      <Card
        title={
          <div className='flex justify-between items-center'>
            <span className='font-semibold text-lg'>ICICI Property Report</span>
            <span className='text-gray-500'>
              Step {step <= 8 ? step : 8} of 8
            </span>
          </div>
        }
        className='shadow-md rounded-2xl'
      >
        {step === 1 && <PropertyForm onNext={handleNext} />}
        {step === 2 && <BoundariesForm onNext={handleNext} />}
        {step === 3 && <SurroundingAmenitiesForm onNext={handleNext} />}
        {step === 4 && <CautionAreaForm onNext={handleNext} />}
        {step === 5 && <ValuationForm onNext={handleNext} />}
        {step === 6 && <ConstructionProgressForm onNext={handleNext} />}
        {step === 7 && <DistanceRangeForm onNext={handleNext} />}
        {/* {step === 8 && <SitePhotographsForm onNext={handleNext} />} */}
        {step === 8 && <RemarksForm onNext={handleNext} />}

        {step > 8 && (
          <div className='text-green-600 font-semibold mt-4'>
            ✅ All steps completed. Data saved.
          </div>
        )}
      </Card>
    </div>
  );
};

export default IciciBank;
