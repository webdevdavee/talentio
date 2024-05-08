import { ChangeEvent, useState } from "react";
import JobsFilter from "./JobsFilter";
import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleFilter4 } from "@/database/actions/job.actions";

type JobsFilterListProps = {
  jobsFrequency: JobsFrequencyData;
};

type FilterVisibility = {
  [key: string]: boolean;
  type: boolean;
  category: boolean;
  level: boolean;
  salary: boolean;
};

const JobsFilterList = ({ jobsFrequency }: JobsFilterListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filterParams = new URLSearchParams(searchParams.toString());

  const [filterVisibility, setFilterVisibility] = useState<FilterVisibility>({
    type: true,
    category: true,
    level: true,
    salary: true,
  });

  const handleToggleFilter = (filterName: string) => {
    setFilterVisibility((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleFilter = async (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    filter: string
  ) => {
    const { checked, name } = e.target;
    if (checked) {
      filterParams.append(type, filter);
      filterParams.set(name, checked.toString());
    } else {
      filterParams.delete(type, filter);
      filterParams.delete(name, checked.toString());
    }
    const typeFilter = filterParams.getAll("type");
    const categoryFilter = filterParams.getAll("category");

    // Call a function that creates a URL string with the data from filterParams
    const categoryURL = createURL(pathname, filterParams);
    // Push the created URL string to the URL
    router.push(`${categoryURL}`);

    // Fetch data from data
    const filteredJobs = await handleFilter4(typeFilter, categoryFilter);
    console.log(filteredJobs);
  };

  const filters = [
    {
      title: "Type of Employment",
      frequency: jobsFrequency.type,
      toggleShowFilter: () => handleToggleFilter("type"),
      showFilter: filterVisibility.type,
      type: "type",
    },
    {
      title: "Category",
      frequency: jobsFrequency.category,
      toggleShowFilter: () => handleToggleFilter("category"),
      showFilter: filterVisibility.category,
      type: "category",
    },
    {
      title: "Level",
      frequency: jobsFrequency.level,
      toggleShowFilter: () => handleToggleFilter("level"),
      showFilter: filterVisibility.level,
      type: "level",
    },
    {
      title: "Salary (per annum)",
      frequency: jobsFrequency.salary,
      toggleShowFilter: () => handleToggleFilter("salary"),
      showFilter: filterVisibility.salary,
      type: "salary",
    },
  ];

  return (
    <section className="w-full">
      <div>
        <div className="flex flex-col gap-10">
          {filters.map((filter, index) => (
            <JobsFilter
              key={index}
              filter={filter}
              handleFilter={handleFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsFilterList;
