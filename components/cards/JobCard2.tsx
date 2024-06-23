import { getRelativeTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type JobCard2Props = {
  job: Job;
  type?: string;
};

const JobCard2 = ({ job, type }: JobCard2Props) => {
  return (
    <Link
      href={`/job/${job._id}`}
      className={`bg-white p-6 duration-200 transition hover:drop-shadow-lg ${
        type && "border border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between sm:flex-col">
        <div className="flex items-start justify-start gap-10 sm:flex-col sm:gap-6">
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
        <span className="flex items-center gap-2 sm:mt-3">
          <Image src="/clock.svg" width={13} height={13} alt="clock" />
          <p className="text-sm text-[gray]">
            {getRelativeTime(new Date(job.createdAt))}
          </p>
        </span>
      </div>
    </Link>
  );
};

export default JobCard2;
