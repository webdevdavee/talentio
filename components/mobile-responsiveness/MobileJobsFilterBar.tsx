import { useState } from "react";
import JobsFilterList from "../others/JobsFilterList";

type MobileJobsFilterBarProps = {
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

const MobileJobsFilterBar = ({
  setJobsData,
  typeFrequency,
  categoryFrequency,
  levelFrequency,
  salaryFrequency,
  newJobsPropertyCount,
  setShowLoader,
}: MobileJobsFilterBarProps) => {
  const [jobsFrequency, setJobsFrequency] = useState<JobsFrequencyData>({
    typeFrequency: typeFrequency,
    categoryFrequency: categoryFrequency,
    levelFrequency: levelFrequency,
    salaryFrequency: salaryFrequency,
  });

  return (
    <section className="w-[20%] m:w-full xl:w-full xxl:hidden xxxl:hidden ultra:hidden">
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

export default MobileJobsFilterBar;
