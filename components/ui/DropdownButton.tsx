"use client";

import Image from "next/image";

type DropdownButtonProps = {
  selectedItem: string;
  showListItem: boolean;
  setShowListItems: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownButton = ({
  selectedItem,
  showListItem,
  setShowListItems,
}: DropdownButtonProps) => {
  return (
    <button
      type="button"
      className="relative w-full py-3 px-1 transition border-[1px] border-gray-400 focus:border-[#272829] focus:transition focus:outline-none overflow-hidden"
      onClick={() => setShowListItems((prev) => !prev)}
    >
      <p className="text-lg">{selectedItem}</p>
      <Image
        src="/arrow-down.svg"
        width={20}
        height={20}
        alt="arrow"
        className={`${
          showListItem && "rotate-180"
        } duration-200 transition absolute top-[1.1rem] right-3`}
      />
    </button>
  );
};

export default DropdownButton;
