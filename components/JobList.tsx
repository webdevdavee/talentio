import { getJobs } from "@/database/actions/job.actions";
import Job from "./Job";

const JobList = async () => {
  const jobs: Job[] | undefined = await getJobs();

  return (
    <>
      {jobs && jobs.length > 0 && (
        <section className="w-full grid grid-cols-4 gap-6">
          {jobs.slice(0, 8).map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </section>
      )}
    </>
  );
};

export default JobList;
