import { getJobsWithFrequency } from "@/database/actions/job.actions";
import { useEffect, useState } from "react";
import JobsFilterList from "./JobsFilterList";

const JobsFilterBar = () => {
  const [jobsFrequency, setJobsFrequency] = useState<JobsFrequencyData>({
    type: [] as JobsFilterFrequency[],
    category: [] as JobsFilterFrequency[],
    level: [] as JobsFilterFrequency[],
    salary: [] as JobsFilterFrequency[],
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
        const [type, category, level, salary] = await Promise.all(promises);

        // Set the jobs frequency with the resolved values
        setJobsFrequency({ type, category, level, salary });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchFiltersFrequency();
  }, []);

  return (
    <section className="w-[20%]">
      <JobsFilterList jobsFrequency={jobsFrequency} />
    </section>
  );
};

export default JobsFilterBar;
