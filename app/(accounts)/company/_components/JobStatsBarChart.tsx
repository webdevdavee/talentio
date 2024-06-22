"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useState } from "react";
import { week, year } from "@/constants";
import Loader from "@/components/Loader";

type JobStatsBarChartProps = {
  selectedTimeFrame: string;
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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const JobStatsBarChart = ({
  selectedTimeFrame,
  jobViewsByYear,
  appliedJobsByYear,
  jobViewsByDaysOfWeekData,
  appliedJobsByDaysOfWeekData,
  daysOfTheWeek,
  showLoader,
}: JobStatsBarChartProps) => {
  const [isScreenWidth, setIsScreenWidth] = useState(0);
  const jobViewsByDaysOfWeekDataCount = jobViewsByDaysOfWeekData?.map(
    (data) => data.count
  );

  const data: ChartData<"bar"> = {
    labels:
      selectedTimeFrame === "Week"
        ? daysOfTheWeek.length > 0
          ? daysOfTheWeek
          : week
        : year,
    datasets: [
      {
        label: "Job views",
        data:
          selectedTimeFrame === "Week"
            ? (jobViewsByDaysOfWeekDataCount as number[])
            : (jobViewsByYear?.viewsCount as number[]),
        backgroundColor: "#4F6F52",
        barPercentage: 0.8,
        // barThickness: 22,
        minBarLength: 7,
      },
      {
        label: "Jobs applied",
        data:
          selectedTimeFrame === "Week"
            ? (appliedJobsByDaysOfWeekData as any[])
            : (appliedJobsByYear?.applicationCount as number[]),
        backgroundColor: "#FF8F00",
        barPercentage: 0.8,
        // barThickness: 22,
        minBarLength: 7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },

    responsive: true,

    maintainAspectRatio: true,

    aspectRatio: 1.5,

    indexAxis: "x",
    // indexAxis: isScreenWidth <= 767 ? "y" : "x",

    scales: {
      x: {
        border: {
          display: false,
        },

        grid: {
          display: false,
          tickLength: 17,
          tickColor: "transparent",
        },

        ticks: {
          font: {
            family: "'DM Sans', sans-serif",
          },
        },
        stacked: true,
      },

      y: {
        display: false,
        border: {
          display: false,
          dash: [8, 4],
        },
        ticks: {
          // callback: (value: any) => value + "k",
          stepSize: 1,
          font: {
            family: "'DM Sans', sans-serif",
          },
        },
        grid: {
          display: true,
          tickLength: 17,
          tickColor: "transparent",
        },
        stacked: true,
      },
    },
  };

  return (
    <section className="col-span-2">
      {!showLoader ? (
        <section>
          <Bar data={data} options={options}></Bar>
          <div className="flex gap-4 mt-8 pl-4">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-[#FF8F00]"></span>
              <p className="text-gray-600">Job views</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-primary"></span>
              <p className="text-gray-600">Jobs applied</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="h-[100%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default JobStatsBarChart;
