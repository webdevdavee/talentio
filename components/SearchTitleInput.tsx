import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";

type SearchTitleInputProps = {
  inputRegister?: UseFormRegisterReturn<"title">;
  error?: JSX.Element;
  placeholderText: string;
  type: string;
};

const SearchTitleInput = ({
  inputRegister,
  error,
  placeholderText,
  type,
}: SearchTitleInputProps) => {
  return (
    <div className="flex items-start gap-4">
      <Image src="/search.svg" width={18} height={18} alt="search" />
      <div className="flex flex-col gap-2">
        <input
          {...inputRegister}
          type="text"
          placeholder={placeholderText}
          className={`w-44 border-b border-b-zinc-300 pb-3 focus:border-b focus:transition focus:outline-none ${
            type === "companies" && "w-[20rem]"
          }`}
        />
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
};

export default SearchTitleInput;
