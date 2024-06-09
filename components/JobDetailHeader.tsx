"use client";

import { createURL } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type JobDetailHeaderProps = {
  job: Job;
};

const JobDetailHeader = ({ job }: JobDetailHeaderProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobToApplyUrlParam = new URLSearchParams(searchParams.toString());

  const applyToJob = () => {
    jobToApplyUrlParam.set("job", job._id);
    // Call the function that creates a URL string with the data from jobToApplyUrlParam
    const url = createURL("/apply-now", jobToApplyUrlParam);
    // Push the created url string to the URL
    router.push(url);
  };

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
        <div className="flex items-center gap-8 cursor-pointer">
          <Image src="/love.svg" width={25} height={25} alt="save-job" />
          <button
            type="button"
            className="bg-primary text-white text-sm px-6 py-2"
            onClick={applyToJob}
          >
            Apply now
          </button>
        </div>
      </span>
    </section>
  );
};

export default JobDetailHeader;
