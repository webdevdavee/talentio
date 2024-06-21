import { MouseEvent } from "react";

type statsOptionProps = {
  statOption: string;
  setStatOption: React.Dispatch<React.SetStateAction<string>>;
};

const StatsOption = ({ statOption, setStatOption }: statsOptionProps) => {
  const handleStatOptionChange = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const option = e.currentTarget.textContent;
    setStatOption(option as string);
  };

  return (
    <section>
      <div className="flex items-center gap-8">
        <button
          type="button"
          className={`font-medium hover:text-primary hover:scale-105 transition pb-2 ${
            statOption === "Overview" &&
            "border-b-[2px] text-primary border-b-primary"
          }`}
          onClick={(e) => handleStatOptionChange(e)}
        >
          Overview
        </button>
        <button
          type="button"
          className={`font-medium hover:text-primary hover:scale-105 transition pb-2 ${
            statOption === "Jobs view" &&
            "border-b-[2px] text-primary border-b-primary"
          }`}
          onClick={(e) => handleStatOptionChange(e)}
        >
          Jobs view
        </button>
        <button
          type="button"
          className={`font-medium hover:text-primary hover:scale-105 transition pb-2 ${
            statOption === "Jobs applied" &&
            "border-b-[2px] text-primary border-b-primary"
          }`}
          onClick={(e) => handleStatOptionChange(e)}
        >
          Jobs applied
        </button>
      </div>
    </section>
  );
};

export default StatsOption;
