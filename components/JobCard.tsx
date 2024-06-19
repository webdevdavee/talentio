import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

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
        <p
          className="text-left"
          dangerouslySetInnerHTML={{
            __html:
              cleanDescription.length > 55
                ? cleanDescription.slice(0, 55) + "..."
                : cleanDescription,
          }}
        ></p>
        <span className="px-3 py-2 border border-gray-300">{job.category}</span>
      </div>
    </Link>
  );
};

export default JobCard;
