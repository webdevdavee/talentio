import Image from "next/image";
import { formatNumberWithCommas } from "@/lib/utils";

type JobViewsProps = {
  jobViews: number;
  jobViewsPercentageChange: number | undefined;
};

const JobViews = ({ jobViews, jobViewsPercentageChange }: JobViewsProps) => {
  return (
    <section className="border border-gray-200 p-4 h-fit">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Job views</h2>
          <Image
            src="/eye.svg"
            width={30}
            height={30}
            alt="eye"
            className="bg-[#FFC700] p-2 rounded-full"
          />
        </div>
        <p className="text-3xl font-medium">
          {formatNumberWithCommas(jobViews.toString())}
        </p>
        <p>
          <span
            className={
              jobViewsPercentageChange && jobViewsPercentageChange > 0
                ? "text-green-600"
                : jobViewsPercentageChange && jobViewsPercentageChange < 0
                ? "text-red-600"
                : "text-[#272829]"
            }
          >
            {jobViewsPercentageChange && jobViewsPercentageChange < 0
              ? Math.abs(jobViewsPercentageChange)
              : jobViewsPercentageChange}
            %{" "}
            {jobViewsPercentageChange && jobViewsPercentageChange > 0
              ? "up"
              : jobViewsPercentageChange && jobViewsPercentageChange < 0
              ? "down"
              : "No change this week"}
          </span>{" "}
          {jobViewsPercentageChange === 0 ? "" : "This week"}
        </p>
      </div>
    </section>
  );
};

export default JobViews;
