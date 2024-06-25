"use client";

import JobDetailHeader from "./JobDetailHeader";
import DOMPurify from "isomorphic-dompurify";
import JobDetailsCompany from "./JobDetailsCompany";
import { getUserSavedJobs } from "@/database/actions/savedjobs.actions";
import { getUserApplications } from "@/database/actions/applications.actions";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { Session } from "next-auth";

type JobProps = {
  job: Job;
  company: Company;
  session: Session | null;
};

const JobDetails = ({ job, company, session }: JobProps) => {
  // const [isLoading, setIsLoading] = useState(true);
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
      // Check if the user has saved jobs
      const userSavedJobs:
        | {
            jobs: any;
            totalPages: number;
          }
        | undefined = await getUserSavedJobs(session?.user.id);

      setUserSavedJobs(userSavedJobs);

      const getUserJobApplications = await getUserApplications(
        session?.user.id
      );
      setGetUserJobApplications(getUserJobApplications);
    };
    fetchData();
  }, [job, session?.user.id]);

  return (
    <section>
      <>
        <div className="flex gap-4 m:flex-col xl:flex-col">
          <div className="w-[70%] m:w-full xl:w-full">
            <JobDetailHeader
              job={job}
              userSavedJobs={userSavedJobs ? userSavedJobs.jobs : undefined}
              userJobApplications={
                getUserJobApplications
                  ? getUserJobApplications.applications
                  : undefined
              }
              session={session}
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
    </section>
  );
};

export default JobDetails;
