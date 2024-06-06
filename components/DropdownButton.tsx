"use client";

import Image from "next/image";

type DropdownButtonProps = {
  selectedQuestion: string;
  showQuestions: boolean;
  setShowQuestions: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownButton = ({
  selectedQuestion,
  showQuestions,
  setShowQuestions,
}: DropdownButtonProps) => {
  return (
    <button
      type="button"
      className="relative w-full py-3 px-1 transition border-[1px] border-gray-400 focus:border-[#272829] focus:transition focus:outline-none overflow-hidden"
      onClick={() => setShowQuestions((prev) => !prev)}
    >
      <p className="text-lg">{selectedQuestion}</p>
      <Image
        src="/arrow-down.svg"
        width={20}
        height={20}
        alt="arrow"
        className={`${
          showQuestions && "rotate-180"
        } duration-200 transition absolute top-[1.1rem] right-3`}
      />
    </button>
  );
};

export default DropdownButton;
