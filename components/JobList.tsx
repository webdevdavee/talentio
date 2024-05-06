import JobCard from "./JobCard";
import JobCard2 from "./JobCard2";
import JobCard3 from "./JobCard3";

type JobListProps = {
  type: string;
  jobs: Job[] | undefined;
  layout?: "row" | "column";
};

const JobList = ({ type, jobs, layout }: JobListProps) => {
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
        ) : type === "latest" ? (
          <section className="w-full grid grid-cols-2 gap-6">
            {jobs.slice(4, 16).map((job) => (
              <JobCard2 key={job._id} job={job} />
            ))}
          </section>
        ) : (
          <section
            className={`${
              layout === "row"
                ? "w-full flex flex-col gap-6"
                : "w-full grid grid-cols-2 gap-6"
            }`}
          >
            {jobs.map((job) => (
              <JobCard3 key={job._id} job={job} layout={layout} />
            ))}
          </section>
        ))}
    </>
  );
};

export default JobList;
