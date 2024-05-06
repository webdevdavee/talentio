import Image from "next/image";

type JobCard2Props = {
  job: Job;
};

const JobCard2 = ({ job }: JobCard2Props) => {
  return (
    <section className="bg-white p-6">
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
    </section>
  );
};

export default JobCard2;
