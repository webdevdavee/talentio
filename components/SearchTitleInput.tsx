import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SearchTitleInputProps = {
  inputRegister?: UseFormRegisterReturn<"title">;
  error?: JSX.Element;
  keywordInputValue: string;
  setKeywordInputValue: Dispatch<SetStateAction<string>>;
  placeholderText: string;
};

const SearchTitleInput = ({
  inputRegister,
  error,
  keywordInputValue,
  setKeywordInputValue,
  placeholderText,
}: SearchTitleInputProps) => {
  return (
    <div className="flex items-start gap-4">
      <Image src="/search.svg" width={18} height={18} alt="search" />
      <input
        {...inputRegister}
        type="text"
        placeholder={placeholderText}
        className="w-44 border-b border-b-zinc-300 pb-3 focus:border-b focus:transition focus:outline-none"
        value={keywordInputValue}
        onChange={(e) => setKeywordInputValue(e.target.value)}
      />
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default SearchTitleInput;
