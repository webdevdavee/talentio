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

type JobsAppliedChartProps = {
  selectedTimeFrame: string;
  appliedJobsByYear:
    | {
        months: string[];
        applicationCount: number[];
      }
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

const JobsAppliedChart = ({
  selectedTimeFrame,
  appliedJobsByYear,
  appliedJobsByDaysOfWeekData,
  daysOfTheWeek,
  showLoader,
}: JobsAppliedChartProps) => {
  const [isScreenWidth, setIsScreenWidth] = useState(0);

  const data: ChartData<"bar"> = {
    labels:
      selectedTimeFrame === "Week"
        ? daysOfTheWeek.length > 0
          ? daysOfTheWeek
          : week
        : year,
    datasets: [
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
        </section>
      ) : (
        <section className="h-[100%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default JobsAppliedChart;
