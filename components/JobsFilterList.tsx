import { ChangeEvent, useEffect, useState } from "react";
import JobsFilter from "./JobsFilter";
import { countPropertyValues, createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleFilter4 } from "@/database/actions/job.actions";

type JobsFilterListProps = {
  jobsFrequency: JobsFrequencyData;
  setJobsData: React.Dispatch<
    React.SetStateAction<{
      jobs: Job[] | undefined;
      totalPages: number | undefined;
    }>
  >;
  setJobsFrequency: React.Dispatch<React.SetStateAction<JobsFrequencyData>>;
};

type FilterVisibility = Record<string, boolean> & {
  type: boolean;
  category: boolean;
  level: boolean;
  salary: boolean;
};

const JobsFilterList = ({
  jobsFrequency,
  setJobsData,
  setJobsFrequency,
}: JobsFilterListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updatedParams = new URLSearchParams(searchParams.toString());

  const [filterVisibility, setFilterVisibility] = useState<FilterVisibility>({
    type: true,
    category: true,
    level: true,
    salary: true,
  });

  const [newFrequencyCount, setNewFrequencyCount] = useState({
    typeFrequency: [] as JobsFilterFrequency[],
    categoryFrequency: [] as JobsFilterFrequency[],
    levelFrequency: [] as JobsFilterFrequency[],
    salaryFrequency: [] as JobsFilterFrequency[],
  });

  const toggleFilterVisibility = (filterName: keyof FilterVisibility) => {
    setFilterVisibility((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const updateFilters = async (updatedParams: URLSearchParams) => {
    const url = createURL(pathname, updatedParams);
    router.push(url);

    const [type, category, level, salary] = [
      "type",
      "category",
      "level",
      "salary",
    ].map((key) => updatedParams.getAll(key));

    const filteredJobs: Job[] | undefined = await handleFilter4(
      type,
      category,
      level,
      salary
    );
    setJobsData({ jobs: filteredJobs, totalPages: undefined });

    const newFrequency = {
      typeFrequency: countPropertyValues(filteredJobs, "type"),
      categoryFrequency: countPropertyValues(filteredJobs, "name"),
      levelFrequency: countPropertyValues(filteredJobs, "level"),
      salaryFrequency: countPropertyValues(filteredJobs, "salary"),
    };

    setNewFrequencyCount(newFrequency);
    setJobsFrequency(newFrequency);
  };

  const handleFilterChange = async (
    e: ChangeEvent<HTMLInputElement>,
    filterType: string,
    filterValue: string
  ) => {
    const { checked, name } = e.target;

    if (checked) {
      updatedParams.append(filterType, filterValue);
    } else {
      updatedParams.delete(filterType, filterValue);
    }
    updatedParams.set(name, checked.toString());

    await updateFilters(updatedParams);
  };

  useEffect(() => {
    console.log(newFrequencyCount);
  }, [newFrequencyCount]);

  const filtersConfig = [
    {
      title: "Type of Employment",
      type: "type",
      frequency: jobsFrequency.typeFrequency,
      toggleShowFilter: () => toggleFilterVisibility("type"),
      showFilter: newFrequencyCount.typeFrequency,
    },
    {
      title: "Category",
      type: "category",
      frequency: jobsFrequency.categoryFrequency,
      toggleShowFilter: () => toggleFilterVisibility("category"),
      showFilter: newFrequencyCount.categoryFrequency,
    },
    {
      title: "Level",
      type: "level",
      frequency: jobsFrequency.levelFrequency,
      toggleShowFilter: () => toggleFilterVisibility("level"),
      showFilter: newFrequencyCount.levelFrequency,
    },
    {
      title: "Salary (per annum)",
      type: "salary",
      frequency: jobsFrequency.salaryFrequency,
      toggleShowFilter: () => toggleFilterVisibility("salary"),
      showFilter: newFrequencyCount.salaryFrequency,
    },
  ];

  return (
    <section className="w-full">
      <div className="flex flex-col gap-10">
        {filtersConfig.map((filter, index) => (
          <JobsFilter
            key={index}
            filter={filter}
            handleFilter={handleFilterChange}
            updatedParams={updatedParams}
          />
        ))}
      </div>
    </section>
  );
};

export default JobsFilterList;
