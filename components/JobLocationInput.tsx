import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type JobLocationInputProps = {
  inputRegister?: UseFormRegisterReturn<"location">;
  error?: JSX.Element;
  handleCountryInput: (e: ChangeEvent<HTMLInputElement>) => void;
  countryInputValue: string;
  showCountryList: boolean;
  setShowCountryList: Dispatch<SetStateAction<boolean>>;
};

const JobLocationInput = ({
  inputRegister,
  error,
  handleCountryInput,
  countryInputValue,
  showCountryList,
  setShowCountryList,
}: JobLocationInputProps) => {
  return (
    <div className="w-fit flex items-start gap-4">
      <Image src="/location.svg" width={18} height={18} alt="search" />
      <button
        type="button"
        className="w-full flex items-center justify-between border-b border-b-zinc-300 focus:border-b overflow-hidden"
      >
        <input
          {...inputRegister}
          type="text"
          placeholder="Search country"
          className="w-fit pb-3 focus:border-b focus:transition focus:outline-none"
          value={countryInputValue}
          onChange={(e) => handleCountryInput(e)}
        />
        <p className="text-sm">{error}</p>
        <Image
          src="/arrow-down.svg"
          width={18}
          height={18}
          alt="search"
          className={`${
            showCountryList && "rotate-180"
          } duration-200 transition`}
          onClick={() => setShowCountryList((prev) => !prev)}
        />
      </button>
    </div>
  );
};

export default JobLocationInput;
