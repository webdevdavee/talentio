import Image from "next/image";
import Link from "next/link";

type JobDetailHeaderProps = {
  job: Job;
};

const JobDetailHeader = ({ job }: JobDetailHeaderProps) => {
  return (
    <section className="flex flex-col gap-3 border-b border-b-gray-200 pb-3">
      <span className="flex items-start justify-between gap-3">
        <span className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold capitalize">{job.title}</h1>
          <span className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Image src="/briefcase2.svg" width={20} height={20} alt="level" />
              <p>{job.level}</p>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/check.svg" width={20} height={20} alt="type" />
              <p>{job.type}</p>
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/location.svg"
                width={20}
                height={20}
                alt="location"
              />
              <p>{job.location}</p>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/coin.svg" width={20} height={20} alt="location" />
              <p>{job.salary}</p>
            </span>
          </span>
        </span>
        <Link
          href="/apply-now"
          className="bg-primary text-white text-sm px-6 py-2"
        >
          Apply now
        </Link>
      </span>
    </section>
  );
};

export default JobDetailHeader;
