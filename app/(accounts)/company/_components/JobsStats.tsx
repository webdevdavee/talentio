import { useDateRangeStore } from "@/lib/store/DateRangeStore";
import ChartTimeFrame from "./ChartTimeFrame";
import JobApplied from "./JobApplied";
import JobOpen from "./JobOpen";
import JobStatsChart from "./JobStatsBarChart";
import JobViews from "./JobViews";
import StatsOption from "./StatsOption";
import { format } from "date-fns";
import { useState } from "react";

type JobsStatsProps = {
  jobViews: number;
  jobViewsPercentageChange: number | undefined;
  companyJobCount: number;
  companyAppliedCount: number | undefined;
  companyAppliedCountPercentage: number | undefined;
  selectedTimeFrame: string;
  setSelectedTimeFrame: React.Dispatch<React.SetStateAction<string>>;
  jobViewsByYear:
    | {
        months: string[];
        viewsCount: number[];
      }
    | undefined;
  appliedJobsByYear:
    | {
        months: string[];
        applicationCount: number[];
      }
    | undefined;
  jobViewsByDaysOfWeekData:
    | {
        date: string;
        count: number;
      }[]
    | undefined;
  appliedJobsByDaysOfWeekData: any[] | undefined;
  daysOfTheWeek: string[];
};

const JobsStats = ({
  jobViews,
  jobViewsPercentageChange,
  companyJobCount,
  companyAppliedCount,
  companyAppliedCountPercentage,
  selectedTimeFrame,
  setSelectedTimeFrame,
  jobViewsByYear,
  appliedJobsByYear,
  jobViewsByDaysOfWeekData,
  appliedJobsByDaysOfWeekData,
  daysOfTheWeek,
}: JobsStatsProps) => {
  const startDate = useDateRangeStore((state) => state.startDate);
  const endDate = useDateRangeStore((state) => state.endDate);

  const [statOption, setStatOption] = useState("Overview");

  return (
    <section className="border border-gray-200 p-4">
      <div className="border-b border-b-gray-200 pb-3 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-xl">Job statistics</h2>
            <p className="text-gray-600 text-sm">
              Showcasing job statistics from{" "}
              {selectedTimeFrame === "Year" ? (
                "Jan - Dec"
              ) : startDate && endDate ? (
                `${format(startDate, "MMMM d")} - ${format(endDate, "MMMM d")}`
              ) : (
                <span className="font-semibold">Select Date Range</span>
              )}
            </p>
          </div>
          <ChartTimeFrame
            selectedTimeFrame={selectedTimeFrame}
            setSelectedTimeFrame={setSelectedTimeFrame}
          />
        </div>
        <StatsOption statOption={statOption} setStatOption={setStatOption} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-10">
        <JobStatsChart
          selectedTimeFrame={selectedTimeFrame}
          jobViewsByYear={jobViewsByYear}
          appliedJobsByYear={appliedJobsByYear}
          jobViewsByDaysOfWeekData={jobViewsByDaysOfWeekData}
          appliedJobsByDaysOfWeekData={appliedJobsByDaysOfWeekData}
          daysOfTheWeek={daysOfTheWeek}
        />
        <div className="flex flex-col gap-4">
          <JobViews
            jobViews={jobViews}
            jobViewsPercentageChange={jobViewsPercentageChange}
          />
          <JobApplied
            companyAppliedCount={companyAppliedCount}
            companyAppliedCountPercentage={companyAppliedCountPercentage}
          />
          <JobOpen companyJobCount={companyJobCount} />
        </div>
      </div>
    </section>
  );
};

export default JobsStats;
