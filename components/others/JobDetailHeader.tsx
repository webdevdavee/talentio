"use client";

import {
  removeUserSavedJob,
  saveJob,
} from "@/database/actions/savedjobs.actions";
import { createURL } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SaveJobBtn from "../ui/SaveJobBtn";
import { Session } from "next-auth";

type JobDetailHeaderProps = {
  job: Job;
  userSavedJobs:
    | {
        userId: string;
        jobId: string;
      }[]
    | undefined;
  userJobApplications: UserApplication[];
  session: Session | null;
};

const JobDetailHeader = ({
  job,
  userSavedJobs,
  userJobApplications,
  session,
}: JobDetailHeaderProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const jobToApplyUrlParam = new URLSearchParams(searchParams.toString());

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
  const savedJob = userSavedJobs?.find((item) => {
    return item.jobId === job._id;
  });

  const saveAJob = async () => {
    // If user is logged in, allow them to save or remove saved job, else take them to sign in
    if (session) {
      if (savedJob) {
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

  // Check if user has applied to job
  const appliedJob = userJobApplications?.find((item) => {
    return item.jobId === job._id;
  });

  return (
    <section className="flex flex-col gap-3 border-b border-b-gray-200 pb-3">
      <span className="flex items-start justify-between gap-3">
        <span className="w-full flex flex-col gap-5">
          <div className="flex items-start justify-between m:flex-col m:gap-8">
            <div className="flex items-center justify-between m:w-full">
              <h1 className="text-2xl font-bold capitalize">{job.title}</h1>
              <SaveJobBtn
                isLoading={isLoading}
                savedJob={savedJob}
                saveAJob={saveAJob}
                className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
              />
            </div>
            <div className="flex items-start gap-8 m:w-full">
              <SaveJobBtn
                isLoading={isLoading}
                savedJob={savedJob}
                saveAJob={saveAJob}
                className="m:hidden"
              />
              <div className="flex flex-col items-center gap-1 m:w-full">
                <button
                  type="button"
                  className={`text-white text-sm px-6 py-2 m:w-full ${
                    job.applied === job.capacity ||
                    appliedJob?.jobId === job._id
                      ? "bg-[gray]"
                      : "bg-primary"
                  }`}
                  onClick={applyToJob}
                  disabled={
                    job.applied === job.capacity ||
                    appliedJob?.jobId === job._id
                  }
                >
                  {job.applied === job.capacity
                    ? "Max applicants reached"
                    : appliedJob
                    ? "Applied"
                    : "Apply now"}
                </button>
                <p className="text-sm font-medium m:mt-2">
                  {job.applied} applied of {job.capacity} applicants
                </p>
              </div>
            </div>
          </div>
          <span className="flex items-center gap-6 m:flex-wrap m:gap-4">
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
      </span>
    </section>
  );
};

export default JobDetailHeader;
