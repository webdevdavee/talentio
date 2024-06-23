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
import Loader from "@/components/ui/Loader";

type JobsViewChartProps = {
  selectedTimeFrame: string;
  jobViewsByYear:
    | {
        months: string[];
        viewsCount: number[];
      }
    | undefined;
  jobViewsByDaysOfWeekData:
    | {
        date: string;
        count: number;
      }[]
    | undefined;
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

const JobsViewChart = ({
  selectedTimeFrame,
  jobViewsByYear,
  jobViewsByDaysOfWeekData,
  daysOfTheWeek,
  showLoader,
}: JobsViewChartProps) => {
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
      },
    },
  };

  return (
    <section className="col-span-2">
      {!showLoader ? (
        <section>
          <Bar data={data} options={options}></Bar>
        </section>
      ) : (
        <section className="h-[100%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default JobsViewChart;
