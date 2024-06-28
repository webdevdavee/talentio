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
    <div className="flex items-start gap-4 m:w-full">
      <Image src="/search.svg" width={18} height={18} alt="search" />
      <div className="flex flex-col gap-2 m:w-full">
        <div className="border-b-[1px] border-b-gray-400">
          <input
            {...inputRegister}
            type="text"
            placeholder={placeholderText}
            className={`w-44 focus:transition focus:outline-none m:text-sm m:w-full ${
              type === "companies" && "w-[20rem]"
            }`}
          />
        </div>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
};

export default SearchTitleInput;
