import { useDateRangeStore } from "@/lib/store/DateRangeStore";
import ChartTimeFrame from "./ChartTimeFrame";
import JobApplied from "./JobApplied";
import JobOpen from "./JobOpen";
import JobStatsChart from "./JobStatsBarChart";
import JobViews from "./JobViews";
import StatsOption from "./StatsOption";
import { format } from "date-fns";
import { useState } from "react";
import JobsViewChart from "./JobsViewChart";
import JobsAppliedChart from "./JobsAppliedChart";

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
  showLoader: boolean;
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
  showLoader,
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
      <div className="grid grid-cols-3 gap-4 mt-10 m:grid-cols-1 m:w-full m:flex m:flex-col m:gap-8 xl:w-full xl:flex xl:flex-col xl:gap-8">
        {statOption === "Overview" ? (
          <JobStatsChart
            selectedTimeFrame={selectedTimeFrame}
            jobViewsByYear={jobViewsByYear}
            appliedJobsByYear={appliedJobsByYear}
            jobViewsByDaysOfWeekData={jobViewsByDaysOfWeekData}
            appliedJobsByDaysOfWeekData={appliedJobsByDaysOfWeekData}
            daysOfTheWeek={daysOfTheWeek}
            showLoader={showLoader}
          />
        ) : statOption === "Jobs view" ? (
          <JobsViewChart
            selectedTimeFrame={selectedTimeFrame}
            jobViewsByYear={jobViewsByYear}
            jobViewsByDaysOfWeekData={jobViewsByDaysOfWeekData}
            daysOfTheWeek={daysOfTheWeek}
            showLoader={showLoader}
          />
        ) : (
          <JobsAppliedChart
            selectedTimeFrame={selectedTimeFrame}
            appliedJobsByYear={appliedJobsByYear}
            appliedJobsByDaysOfWeekData={appliedJobsByDaysOfWeekData}
            daysOfTheWeek={daysOfTheWeek}
            showLoader={showLoader}
          />
        )}
        <div className="flex flex-col gap-4 m:w-full xl:w-full">
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
