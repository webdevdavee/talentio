import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type JobTitleInputProps = {
  inputRegister?: UseFormRegisterReturn<"title">;
  error?: JSX.Element;
  jobInputValue: string;
  setJobInputValue: Dispatch<SetStateAction<string>>;
};

const JobTitleInput = ({
  inputRegister,
  error,
  jobInputValue,
  setJobInputValue,
}: JobTitleInputProps) => {
  return (
    <div className="flex items-start gap-4">
      <Image src="/search.svg" width={18} height={18} alt="search" />
      <input
        {...inputRegister}
        type="text"
        placeholder="Job title or keyword"
        className="w-44 border-b border-b-zinc-300 pb-3 focus:border-b focus:transition focus:outline-none"
        value={jobInputValue}
        onChange={(e) => setJobInputValue(e.target.value)}
      />
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default JobTitleInput;
