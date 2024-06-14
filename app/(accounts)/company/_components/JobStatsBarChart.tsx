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
import Image from "next/image";
import { useState } from "react";
import { week } from "@/constants";
import Loader from "@/components/Loader";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const JobStatsBarChart = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isScreenWidth, setIsScreenWidth] = useState(0);

  const data: ChartData<"bar"> = {
    labels: week,
    datasets: [
      {
        label: "Orders",
        data: [45, 21, 12, 11, 10, 36, 59],
        backgroundColor: "#272829",
        borderRadius: 5,
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
            family: "'Poppins', sans-serif",
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
            family: "'Poppins', sans-serif",
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
          <div className="flex gap-4 mt-8 pl-4">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-[#FF8F00]"></span>
              <p className="text-gray-600">Job view</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 bg-primary"></span>
              <p className="text-gray-600">Job applied</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="h-[70%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default JobStatsBarChart;
