import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";

type DropdownListInputProps = {
  dropdownData: string[];
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  secondaryText: string;
  required?: boolean;
};

const DropdownListInput = ({
  dropdownData,
  data,
  setData,
  label,
  secondaryText,
  required,
}: DropdownListInputProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowIndustryDropdown] = useState(false);

  const handleItemClick = (item: string) => {
    if (!data.includes(item) && data.length < 3) {
      setData([...data, item]);
    }
  };

  const removeItem = (item: string) => {
    setData(data.filter((i) => i !== item));
  };

  // Handle clicks outside profile dialog
  useClickOutside(dropdownRef, () => {
    setShowIndustryDropdown(false);
  });

  return (
    <div ref={dropdownRef} className="relative">
      <div className="flex items-center justify-between mb-3">
        <label className="text-base font-light flex gap-1">
          {label}{" "}
          <p className={`${required ? "text-red-400" : "text-[#272829]"}`}>
            {required ? "*" : "(Optional)"}
          </p>
        </label>
        <button
          type="button"
          className="text-sm bg-primary py-1 px-2 text-white"
          onClick={() => setShowIndustryDropdown((prev) => !prev)}
        >
          Open dropdown
        </button>
      </div>
      <button
        type="button"
        className="border w-full border-gray-400 px-4 py-2 min-h-12 max-h-24 flex flex-wrap items-center gap-2 overflow-y-scroll custom-scrollbar"
      >
        {data.length > 0 ? (
          data.map((item) => (
            <span
              key={item}
              className="flex bg-primary px-2 py-2 items-center gap-1"
            >
              <p className="text-sm text-white">{item}</p>
              <span onClick={() => removeItem(item)} className="cursor-pointer">
                <Image src="/close.svg" width={17} height={17} alt="close" />
              </span>
            </span>
          ))
        ) : (
          <p className="text-sm">{secondaryText}</p>
        )}
      </button>
      <ul
        className="w-full absolute mt-2 custom-scrollbar h-48 bg-white border border-gray-400 drop-shadow-lg overflow-y-scroll"
        style={{ display: showDropdown ? "block" : "none" }}
      >
        {dropdownData.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownListInput;
