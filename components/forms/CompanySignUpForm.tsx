"use client";

import { useState } from "react";
import CompanySignupStep1 from "../authentication/CompanySignupStep1";
import CompanySignupStep2 from "../authentication/CompanySignupStep2";
import CompanySignupStep3 from "../authentication/CompanySignupStep3";

type Step1 = {
  size: string;
  name: string;
  email: string;
  password: string;
};

type Step2 = {
  industry: string[];
  about: string;
  logo: string;
};

type Step3 = {
  twitter: string;
  facebook: string;
  linkedin: string;
  mail: string;
};

const CompanySignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1Data: {} as Step1,
    step2Data: {} as Step2,
    step3Data: {} as Step3,
  });
  const [error, setError] = useState<string | undefined>("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (newData: any) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };
  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-[50%] flex flex-col gap-6 items-center justify-center py-12 px-24 m:w-full m:p-4 xl:p-10">
        {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
        <h1
          className="text-2xl font-medium mb-4 m:text-center"
          style={{ display: step === 2 || step === 3 ? "none" : "block" }}
        >
          Create company account
        </h1>
        {step === 1 ? (
          <CompanySignupStep1
            nextStep={nextStep}
            updateFormData={updateFormData}
          />
        ) : step === 2 ? (
          <CompanySignupStep2
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            setError={setError}
          />
        ) : (
          <CompanySignupStep3
            prevStep={prevStep}
            updateFormData={updateFormData}
            formData={formData}
            setError={setError}
          />
        )}
      </div>
      <picture className="w-[50%] h-screen comp-sign-up m:hidden"></picture>
    </section>
  );
};

export default CompanySignUpForm;
