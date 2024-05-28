import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SearchListInputProps = {
  inputRegister?: UseFormRegisterReturn<"list">;
  error?: JSX.Element;
  handleListInput: (e: ChangeEvent<HTMLInputElement>) => void;
  listInputValue: string;
  showList: boolean;
  setShowList: Dispatch<SetStateAction<boolean>>;
};

const SearchListInput = ({
  inputRegister,
  error,
  handleListInput,
  listInputValue,
  showList,
  setShowList,
}: SearchListInputProps) => {
  return (
    <div className="w-fit flex items-start gap-4">
      <Image src="/location.svg" width={18} height={18} alt="search" />
      <button
        type="button"
        className="w-full flex items-start justify-between border-b border-b-zinc-300 focus:border-b overflow-hidden"
      >
        <div className="flex flex-col gap-2">
          <input
            {...inputRegister}
            type="text"
            placeholder="Search country"
            className="w-fit pb-1 focus:transition focus:outline-none"
            value={listInputValue}
            onChange={(e) => handleListInput(e)}
          />
          <p className="text-sm">{error}</p>
        </div>
        <Image
          src="/arrow-down.svg"
          width={18}
          height={18}
          alt="search"
          className={`${showList && "rotate-180"} duration-200 transition`}
          onClick={() => setShowList((prev) => !prev)}
        />
      </button>
    </div>
  );
};

export default SearchListInput;
