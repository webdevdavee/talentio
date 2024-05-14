import Image from "next/image";
import Link from "next/link";

type JobCardProps = {
  job: Job;
};

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link
      href={`/job/${job._id}`}
      className="border border-zinc-300 p-5 hover:scale-105 duration-200 transition"
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
          <span className="py-1 px-2 text-sm border border-primary">
            {job.type}
          </span>
        </div>
        <p className="text-lg font-bold text-left">{job.title}</p>
        <p className="text-left font-medium">
          {job.company} - {job.location}
        </p>
        <p className="text-left">
          {job.description.length > 55
            ? job.description.slice(0, 55) + "..."
            : job.description}
        </p>
        <span className="px-3 py-2 border border-gray-300">
          {job.category.name}
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
