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
  page: number;
  newJobsPropertyCount: JobsFrequencyData | undefined;
  search: string[];
};

const JobsFilterBar = ({
  setJobsData,
  typeFrequency,
  categoryFrequency,
  levelFrequency,
  salaryFrequency,
  page,
  newJobsPropertyCount,
  search,
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
        jobsFrequency={
          newJobsPropertyCount ? newJobsPropertyCount : jobsFrequency
        }
        setJobsData={setJobsData}
        setJobsFrequency={setJobsFrequency}
        page={page}
        search={search}
      />
    </section>
  );
};

export default JobsFilterBar;
