import { securityQuestions } from "@/constants";
import { MouseEvent } from "react";

type DropdownListProps = {
  setShowQuestions: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string>>;
};

const DropdownList = ({
  setShowQuestions,
  setSelectedQuestion,
}: DropdownListProps) => {
  const selectQuestion = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const question = e.currentTarget.textContent;
    setSelectedQuestion(question ? question : "");
    setShowQuestions(false);
  };

  return (
    <section className="absolute custom-scrollbar h-48 bg-white border border-gray-400 drop-shadow-lg overflow-y-scroll">
      <div>
        {securityQuestions.map((question, index) => (
          <button
            type="button"
            key={index}
            className="w-full text-left border-b border-b-gray-300 py-4 px-2 hover:bg-gray-100 transition"
            onClick={(e) => selectQuestion(e)}
          >
            {question}
          </button>
        ))}
      </div>
    </section>
  );
};

export default DropdownList;
