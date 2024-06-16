"use client";

import JobDetailHeader from "./JobDetailHeader";
import DOMPurify from "isomorphic-dompurify";
import JobDetailsCompany from "./JobDetailsCompany";
import { getUserSavedJobs } from "@/database/actions/savedjobs.actions";
import { getUserApplications } from "@/database/actions/applications.actions";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type JobProps = {
  job: Job;
  company: Company;
  userId: string | undefined;
};

const JobDetails = ({ job, company, userId }: JobProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const cleanDescription = DOMPurify.sanitize(
    job.description ? job.description : ""
  );
  const [userSavedJobs, setUserSavedJobs] = useState<
    | {
        jobs: any;
        totalPages: number;
      }
    | undefined
  >();
  const [getUserJobApplications, setGetUserJobApplications] = useState<
    | {
        applications: any;
        totalPages: number;
      }
    | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      // Check if user has saved jobs
      const userSavedJobs:
        | {
            jobs: any;
            totalPages: number;
          }
        | undefined = await getUserSavedJobs(userId);

      setUserSavedJobs(userSavedJobs);

      const getUserJobApplications = await getUserApplications(userId);
      setGetUserJobApplications(getUserJobApplications);

      if (job) setIsLoading(false);
    };
    fetchData();
  }, [job, userId]);

  return (
    <section>
      {!isLoading ? (
        <>
          <div className="flex gap-4">
            <div className="w-[70%]">
              <JobDetailHeader
                job={job}
                userSavedJobs={userSavedJobs ? userSavedJobs.jobs : undefined}
                userJobApplications={
                  getUserJobApplications
                    ? getUserJobApplications.applications
                    : undefined
                }
              />
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: cleanDescription,
                }}
              />
            </div>
            <JobDetailsCompany company={company} />
          </div>
        </>
      ) : (
        <section className="h-[70%] flex items-center justify-center py-16">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default JobDetails;
