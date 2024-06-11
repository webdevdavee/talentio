import JobDetailHeader from "./JobDetailHeader";
import DOMPurify from "isomorphic-dompurify";
import JobDetailsCompany from "./JobDetailsCompany";
import { getUserSavedJobs } from "@/database/actions/savedjobs.actions";
import { auth } from "@/auth";
import { getUserApplications } from "@/database/actions/applications.actions";

type JobProps = {
  job: Job;
  company: Company;
};

const JobDetails = async ({ job, company }: JobProps) => {
  const session = await auth();

  const cleanLongDescription = DOMPurify.sanitize(
    job.long_description ? job.long_description : ""
  );

  // Check if user has saved jobs
  const userSavedJobs:
    | {
        jobs: any;
        totalPages: number;
      }
    | undefined = await getUserSavedJobs(session?.user.id);

  const getUserJobApplications = await getUserApplications(session?.user.id);

  return (
    <section>
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
              __html: cleanLongDescription,
            }}
          />
        </div>
        <JobDetailsCompany company={company} />
      </div>
    </section>
  );
};

export default JobDetails;
