"use client";

import Image from "next/image";
import MetricCards from "./MetricCards";
import JobsStats from "./JobsStats";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDateRangeStore } from "@/lib/store/DateRangeStore";

const DashboardWrapper = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  return (
    <section className="px-8 flex flex-col gap-8 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl">Good morning</h1>
          <p className="text-gray-600 text-sm">
            Here is your job listing statistic report from{" "}
            {startDate && endDate ? (
              `${format(startDate, "MMMM d")} - ${format(endDate, "MMMM d")}`
            ) : (
              <span className="font-semibold">Select Date Range</span>
            )}
          </p>
        </div>
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-3 border border-gray-200 p-2"
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <p className="text-sm">
              {startDate && endDate
                ? `${format(startDate, "MMMM d")} - ${format(
                    endDate,
                    "MMMM d"
                  )}`
                : "Select Date Range"}
            </p>
            <Image src="/calendar.svg" width={16} height={16} alt="calendar" />
          </button>
          <div className="absolute right-0 w-[20rem] mt-4">
            {showCalendar && (
              <Calendar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setShowCalendar={setShowCalendar}
              />
            )}
          </div>
        </div>
      </div>
      <MetricCards />
      <JobsStats />
    </section>
  );
};

export default DashboardWrapper;
