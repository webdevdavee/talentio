"use client";

import {
  removeUserSavedJob,
  saveJob,
} from "@/database/actions/savedjobs.actions";
import { createURL } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type JobDetailHeaderProps = {
  job: Job;
  userSavedJobs:
    | {
        userId: string;
        jobId: string;
      }[]
    | undefined;
};

const JobDetailHeader = ({ job, userSavedJobs }: JobDetailHeaderProps) => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const jobToApplyUrlParam = new URLSearchParams(searchParams.toString());

  // If job is saved by the user
  const [jobSaved, setJobSaved] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const applyToJob = () => {
    // If user is logged in, allow them apply to job, else take them to sign in
    if (session) {
      jobToApplyUrlParam.set("job", job._id);
      // Call the function that creates a URL string with the data from jobToApplyUrlParam
      const url = createURL("/apply-now", jobToApplyUrlParam);
      // Push the created url string to the URL
      router.push(url);
    } else {
      router.push("/sign-in");
    }
  };

  // Check if job is saved by user
  const isJobSaved = userSavedJobs?.find((item) => {
    return item.jobId === job._id;
  });

  const saveAJob = async () => {
    // If user is logged in, allow them to save or remove saved job, else take them to sign in
    if (session) {
      if (isJobSaved) {
        setIsLoading(true);
        await removeUserSavedJob(session.user.id, job._id, pathname);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      await saveJob(
        { userId: session?.user.id as string, jobId: job._id },
        pathname
      );
      setIsLoading(false);
    } else {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    if (isJobSaved) {
      setJobSaved(true);
    } else {
      setJobSaved(false);
    }
  }, [isJobSaved]);

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
        <div className="flex items-start gap-8 cursor-pointer">
          {isLoading ? (
            <Image
              className="animate-spin"
              width={25}
              height={25}
              src="/loading-spinner.svg"
              alt="wishlist"
            />
          ) : jobSaved ? (
            <Image
              src="/love-filled.svg"
              width={25}
              height={25}
              alt="save-job"
              onClick={saveAJob}
            />
          ) : (
            <Image
              src="/love.svg"
              width={25}
              height={25}
              alt="save-job"
              onClick={saveAJob}
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              className={`text-white text-sm px-6 py-2 ${
                job.applied === job.capacity ? "bg-gray-400" : "bg-primary"
              }`}
              onClick={applyToJob}
              disabled={job.applied === job.capacity}
            >
              {job.applied === job.capacity
                ? "Max applicants reached"
                : "Apply now"}
            </button>
            <p className="text-sm font-medium">
              {job.applied} applied of {job.capacity} applicants
            </p>
          </div>
        </div>
      </span>
    </section>
  );
};

export default JobDetailHeader;
