import { MouseEvent } from "react";

type ChartTimeFrameProps = {
  selectedTimeFrame: string;
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<string>>;
};

const ChartTimeFrame = ({
  selectedTimeFrame,
  setSelectedTimeFrame,
}: ChartTimeFrameProps) => {
  const handleTimeFrameChange = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const timeFrame = e.currentTarget.textContent;
    setSelectedTimeFrame(timeFrame as string);
  };

  return (
    <section className="bg-zinc-200 p-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={`text-primary p-2 font-medium ${
            selectedTimeFrame === "Week" && "bg-white"
          }`}
          onClick={(e) => handleTimeFrameChange(e)}
        >
          Week
        </button>
        <button
          type="button"
          className={`text-primary p-2 font-medium ${
            selectedTimeFrame === "Year" && "bg-white"
          }`}
          onClick={(e) => handleTimeFrameChange(e)}
        >
          Year
        </button>
      </div>
    </section>
  );
};

export default ChartTimeFrame;
