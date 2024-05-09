import { getJobsWithFrequency } from "@/database/actions/job.actions";
import { useEffect, useState } from "react";
import JobsFilterList from "./JobsFilterList";

type JobsFilterBarProps = {
  setJobsData: React.Dispatch<
    React.SetStateAction<{
      jobs: Job[] | undefined;
      totalPages: number | undefined;
    }>
  >;
};

const JobsFilterBar = ({ setJobsData }: JobsFilterBarProps) => {
  const [jobsFrequency, setJobsFrequency] = useState<JobsFrequencyData>({
    typeFrequency: [] as JobsFilterFrequency[],
    categoryFrequency: [] as JobsFilterFrequency[],
    levelFrequency: [] as JobsFilterFrequency[],
    salaryFrequency: [] as JobsFilterFrequency[],
  });

  useEffect(() => {
    const fetchFiltersFrequency = async () => {
      try {
        // Create an array of promises
        const promises = [
          getJobsWithFrequency("type"),
          getJobsWithFrequency("category.name"),
          getJobsWithFrequency("level"),
          getJobsWithFrequency("salary"),
        ];

        // Using Promise.all to wait for all promises to resolve
        const [
          typeFrequency,
          categoryFrequency,
          levelFrequency,
          salaryFrequency,
        ] = await Promise.all(promises);

        // Set the jobs frequency with the resolved values
        setJobsFrequency({
          typeFrequency,
          categoryFrequency,
          levelFrequency,
          salaryFrequency,
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchFiltersFrequency();
  }, []);

  return (
    <section className="w-[20%]">
      <JobsFilterList
        jobsFrequency={jobsFrequency}
        setJobsData={setJobsData}
        setJobsFrequency={setJobsFrequency}
      />
    </section>
  );
};

export default JobsFilterBar;
