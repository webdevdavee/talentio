import { getJobs } from "@/database/actions/job.actions";
import JobCard from "./JobCard";
import JobCard2 from "./JobCard2";

type JobListProps = {
  type: string;
};

const JobList = async ({ type }: JobListProps) => {
  const jobs: Job[] | undefined = await getJobs();

  return (
    <>
      {jobs &&
        jobs.length > 0 &&
        (type === "featured" ? (
          <section className="w-full grid grid-cols-4 gap-6">
            {jobs.slice(0, 8).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </section>
        ) : (
          <section className="w-full grid grid-cols-2 gap-6">
            {jobs.slice(8, 16).map((job) => (
              <JobCard2 key={job._id} job={job} />
            ))}
          </section>
        ))}
    </>
  );
};

export default JobList;
