"use client";

import Image from "next/image";
import MetricCards from "./MetricCards";
import JobsStats from "./JobsStats";
import Calendar from "./Calendar";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useDateRangeStore } from "@/lib/store/DateRangeStore";
import useClickOutside from "@/hooks/useClickOutside";
import { getJobViewsByWeekDays } from "@/database/actions/jobview.action";
import { getAppliedCountByDayOfWeek } from "@/database/actions/job.actions";
import { generateDaysOfWeek } from "@/lib/utils";

type DashboardWrapperProps = {
  company: Company;
  pageViews: number;
  newCandidatesCount: number | undefined;
  jobViews: number;
  jobViewsPercentageChange: number | undefined;
  companyJobCount: number;
  companyAppliedCount: number | undefined;
  companyAppliedCountPercentage: number | undefined;
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
};

const DashboardWrapper = ({
  company,
  pageViews,
  newCandidatesCount,
  jobViews,
  jobViewsPercentageChange,
  companyJobCount,
  companyAppliedCount,
  companyAppliedCountPercentage,
  jobViewsByYear,
  appliedJobsByYear,
}: DashboardWrapperProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Week");
  const [jobViewsByDaysOfWeekData, setJobViewsByDaysOfWeekData] = useState<
    | {
        date: string;
        count: number;
      }[]
    | undefined
  >();
  const [appliedJobsByDaysOfWeekData, setAppliedJobsByDaysOfWeekData] =
    useState<any[] | undefined>();
  const [daysOfTheWeek, setDaysOfTheWeek] = useState<string[]>([]);

  // Retrieve the date range from localStorage
  useEffect(() => {
    const savedDateRange = localStorage.getItem("DateRange");
    if (savedDateRange) {
      const [start, end] = savedDateRange.replace(/"/g, "").split(" - ");
      if (start && end) {
        // Parse the dates and set them to state
        setStartDate(new Date(start + " " + format(new Date(), "yyyy")));
        setEndDate(new Date(end + " " + format(new Date(), "yyyy")));
        useDateRangeStore.setState({
          startDate: new Date(start + " " + format(new Date(), "yyyy")),
          endDate: new Date(end + " " + format(new Date(), "yyyy")),
        });
      }
    }
  }, []);

  // Fetch chart data when user selects custom date
  useEffect(() => {
    const fetchData = async () => {
      const [jobViewsByDaysOfWeek, appliedJobsByDaysOfWeek] = await Promise.all(
        [
          getJobViewsByWeekDays(company.userId, startDate as Date),
          getAppliedCountByDayOfWeek(
            company.userId,
            startDate as Date,
            endDate as Date
          ),
        ]
      );
      setJobViewsByDaysOfWeekData(jobViewsByDaysOfWeek);
      setAppliedJobsByDaysOfWeekData(appliedJobsByDaysOfWeek);
    };
    fetchData();
    const daysOfWeek = generateDaysOfWeek(startDate as Date);
    setDaysOfTheWeek(daysOfWeek);
    setTimeout(() => {
      setShowLoader(false);
    }, 2200);
  }, [startDate, endDate]);

  //greeting with respect to time of the day
  const getGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      return `Good morning, ${company.company}!`;
    } else if (currentTime >= 12 && currentTime < 18) {
      return `Good afternoon, ${company.company}!`;
    } else {
      return `Good evening, ${company.company}!`;
    }
  };

  // Handle clicks outside profile dialog
  useClickOutside(calendarRef, () => {
    setShowCalendar(false);
  });

  return (
    <section className="px-8 flex flex-col gap-8 mb-4 m:px-4 xl:px-4">
      <div className="flex items-center justify-between m:flex-col m:gap-4 m:items-start xl:flex-col xl:gap-6 xl:items-start">
        <div className="m:flex m:flex-col m:gap-3 xl:flex xl:flex-col xl:gap-4">
          <h1 className="font-semibold text-xl">{getGreeting()}</h1>
          <p className="text-gray-600 text-sm m:text-base">
            Here is your job listing statistic report from{" "}
            {selectedTimeFrame === "Year" ? (
              "Jan - Dec"
            ) : startDate && endDate ? (
              `${format(startDate, "MMMM d")} - ${format(endDate, "MMMM d")}`
            ) : (
              <span className="font-semibold">Select Date Range</span>
            )}
          </p>
        </div>
        <div
          ref={calendarRef}
          className="relative m:w-full xl:w-full xl:flex xl:justify-end"
        >
          <button
            type="button"
            className="flex items-center gap-3 border border-gray-200 p-2 m:w-full m:justify-between m:border-gray-300"
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <p className="text-sm m:font-medium m:text-base">
              {startDate && endDate
                ? `${format(startDate, "MMMM d")} - ${format(
                    endDate,
                    "MMMM d"
                  )}`
                : "Select Date Range"}
            </p>
            <Image src="/calendar.svg" width={16} height={16} alt="calendar" />
          </button>
          <div className="absolute right-0 w-[20rem] mt-4 m:w-full xl:mt-12">
            {showCalendar && (
              <Calendar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            )}
          </div>
        </div>
      </div>
      <MetricCards
        pageViews={pageViews}
        newCandidatesCount={newCandidatesCount}
      />
      <JobsStats
        jobViews={jobViews}
        jobViewsPercentageChange={jobViewsPercentageChange}
        companyJobCount={companyJobCount}
        companyAppliedCount={companyAppliedCount}
        companyAppliedCountPercentage={companyAppliedCountPercentage}
        selectedTimeFrame={selectedTimeFrame}
        setSelectedTimeFrame={setSelectedTimeFrame}
        jobViewsByYear={jobViewsByYear}
        appliedJobsByYear={appliedJobsByYear}
        jobViewsByDaysOfWeekData={jobViewsByDaysOfWeekData}
        appliedJobsByDaysOfWeekData={appliedJobsByDaysOfWeekData}
        daysOfTheWeek={daysOfTheWeek}
        showLoader={showLoader}
      />
    </section>
  );
};

export default DashboardWrapper;
