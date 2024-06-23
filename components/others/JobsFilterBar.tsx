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
  newJobsPropertyCount: JobsFrequencyData | undefined;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const JobsFilterBar = ({
  setJobsData,
  typeFrequency,
  categoryFrequency,
  levelFrequency,
  salaryFrequency,
  newJobsPropertyCount,
  setShowLoader,
}: JobsFilterBarProps) => {
  const [jobsFrequency, setJobsFrequency] = useState<JobsFrequencyData>({
    typeFrequency: typeFrequency,
    categoryFrequency: categoryFrequency,
    levelFrequency: levelFrequency,
    salaryFrequency: salaryFrequency,
  });

  return (
    <section className="w-[20%] sm:hidden">
      <JobsFilterList
        jobsFrequency={
          newJobsPropertyCount ? newJobsPropertyCount : jobsFrequency
        }
        setJobsData={setJobsData}
        setJobsFrequency={setJobsFrequency}
        setShowLoader={setShowLoader}
      />
    </section>
  );
};

export default JobsFilterBar;
