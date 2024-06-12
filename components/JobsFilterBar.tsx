import { useState } from "react";
import JobsFilterList from "./JobsFilterList";

type JobsFilterBarProps = {
  setJobsData: React.Dispatch<
    React.SetStateAction<{
      jobs: Job[] | undefined;
      totalPages: number | undefined;
    }>
  >;
  typeFrequency: JobsFilterFrequency[];
  categoryFrequency: JobsFilterFrequency[];
  levelFrequency: JobsFilterFrequency[];
  salaryFrequency: JobsFilterFrequency[];
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const JobsFilterBar = ({
  setJobsData,
  typeFrequency,
  categoryFrequency,
  levelFrequency,
  salaryFrequency,
  setShowLoader,
}: JobsFilterBarProps) => {
  const [jobsFrequency, setJobsFrequency] = useState<JobsFrequencyData>({
    typeFrequency: typeFrequency,
    categoryFrequency: categoryFrequency,
    levelFrequency: levelFrequency,
    salaryFrequency: salaryFrequency,
  });

  return (
    <section className="w-[20%]">
      <JobsFilterList
        jobsFrequency={jobsFrequency}
        setJobsData={setJobsData}
        setJobsFrequency={setJobsFrequency}
        setShowLoader={setShowLoader}
      />
    </section>
  );
};

export default JobsFilterBar;
