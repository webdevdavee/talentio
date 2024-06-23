import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { getRelativeTime } from "@/lib/utils";

type JobCardProps = {
  job: Job;
};

const JobCard = ({ job }: JobCardProps) => {
  const cleanDescription = DOMPurify.sanitize(
    job.description ? job.description : ""
  );

  return (
    <Link
      href={`/job/${job._id}`}
      className="border border-zinc-300 p-5 hover:scale-105 duration-200 transition sm:flex-none sm:w-56"
    >
      <div className="flex flex-col items-start justify-between h-full gap-4">
        <div className="w-full flex items-center justify-between">
          <Image
            src={job.companylogo}
            width={50}
            height={50}
            quality={100}
            alt={job.title}
          />
          <span className="py-1 px-2 text-sm border border-primary sm:text-xs sm:p-1">
            {job.type}
          </span>
        </div>
        <p className="text-lg font-bold text-left sm:text-base">{job.title}</p>
        <p className="text-left font-medium sm:text-base">
          {job.company} - {job.location}
        </p>
        <p
          className="text-left sm:text-sm"
          dangerouslySetInnerHTML={{
            __html:
              cleanDescription.length > 55
                ? cleanDescription.slice(0, 55) + "..."
                : cleanDescription,
          }}
        ></p>
        <div className="w-full flex items-center justify-between sm:flex-col sm:justify-start sm:gap-2 sm:items-start">
          <span className="px-3 py-2 border border-gray-300 sm:p-1 sm:text-sm">
            {job.category}
          </span>
          <span className="flex items-center gap-2">
            <Image src="/clock.svg" width={13} height={13} alt="clock" />
            <p className="text-sm text-[gray]">
              {getRelativeTime(new Date(job.createdAt))}
            </p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
