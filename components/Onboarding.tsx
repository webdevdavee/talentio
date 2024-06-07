"use client";

import { FormEvent, useState } from "react";
import RadioInput from "./RadioInput";
import { useRouter } from "next/navigation";
import Loader2 from "./Loader2";

const Onboarding = () => {
  const router = useRouter();

  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (label: string) => {
    setSelectedRadio(label);
  };

  const submitAccountType = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if the user selected an account type
    if (selectedRadio !== null) {
      // If the user selected "individual", take user to normal sign-up page else, take the user to the company sign-up page
      if (selectedRadio === "individual") {
        router.push("/sign-up");
      } else {
        router.push("/company/sign-up");
      }
    } else {
      setError("Please choose account type");
    }
    setIsLoading(false);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-[50%] flex flex-col gap-10 items-center justify-center py-12 px-24">
        <article className="flex flex-col gap-3 items-center justify-center">
          <h1 className="text-2xl font-medium">Welcome to Talentio!</h1>
          <p>Find your dream job and grow your career.</p>
        </article>
        <form onSubmit={(e) => submitAccountType(e)} className="w-full">
          <h1 className="text-center text-2xl font-medium mb-8">
            Choose Your Account Type
          </h1>
          <div className="flex flex-col gap-4">
            <RadioInput
              id="individual"
              name="radio-group"
              label="Individual"
              checked={selectedRadio === "individual"}
              onChange={handleRadioChange}
            />
            <RadioInput
              id="company"
              name="radio-group"
              label="Company"
              checked={selectedRadio === "company"}
              onChange={handleRadioChange}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className={`w-full px-4 py-3 mt-6 text-white ${
              isLoading ? "bg-gray-200" : "bg-primary transition duration-150"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="second-loader" />
            ) : (
              <p>Continue</p>
            )}
          </button>
        </form>
      </div>
      <picture className="w-[50%] h-screen onboarding-img"></picture>
    </section>
  );
};

export default Onboarding;
