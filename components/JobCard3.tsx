import Image from "next/image";
import Link from "next/link";

type JobCard3Props = {
  job: Job;
  layout: "row" | "column" | undefined;
};

const JobCard3 = ({ job, layout }: JobCard3Props) => {
  return (
    <Link
      href={`/job/${job._id}`}
      className="bg-white p-8 border border-gray-400 cursor-pointer"
    >
      <div
        className={`w-full flex justify-between ${
          layout === "column" && "flex-col gap-6"
        }`}
      >
        <div className="flex items-start justify-start gap-10">
          <Image
            src={job.companylogo}
            width={50}
            height={50}
            quality={100}
            alt={job.title}
          />
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold text-left">{job.title}</p>
            <p className="text-left font-medium">
              {job.company} - {job.location}
            </p>
            <span className="w-fit py-1 px-2 text-sm border border-primary">
              {job.type}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="w-full h-fit bg-primary px-3 py-2 text-white"
          >
            Apply
          </button>
          <p className={`text-sm ${layout === "column" && "text-center mt-4"}`}>
            <span className="font-semibold">{job.applied} applied</span> of{" "}
            {job.capacity} capacity
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard3;
