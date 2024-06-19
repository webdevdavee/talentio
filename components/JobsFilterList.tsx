import { ChangeEvent, useState } from "react";
import JobsFilter from "./JobsFilter";
import { countPropertyValues, createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleJobFilter } from "@/database/actions/job.actions";

type JobsFilterListProps = {
  jobsFrequency: JobsFrequencyData;
  setJobsData: React.Dispatch<
    React.SetStateAction<{
      jobs: Job[] | undefined;
      totalPages: number | undefined;
    }>
  >;
  setJobsFrequency: React.Dispatch<React.SetStateAction<JobsFrequencyData>>;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
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
  setShowLoader,
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

  // Toggle the visibility of specific filters
  const toggleFilterVisibility = (filterName: keyof FilterVisibility) => {
    setFilterVisibility((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const updateFilters = async (updatedParams: URLSearchParams) => {
    // Create a URL query
    const url = createURL(pathname, updatedParams);
    // Send the created query to the URL
    router.push(url, { scroll: false });

    setShowLoader(true);
    // Fetch the updated URL keys and values from the URL and save the data in the respective variables
    const [type, category, level, salary, search] = [
      "type",
      "category",
      "level",
      "salary",
      "search",
    ].map((key) => updatedParams.getAll(key));

    // Depending on which key data was fetched, send the data to the server action "handleJobFilter" to filter the database collection
    const filteredJobs: GetJob | undefined = await handleJobFilter({
      typeFilter: type,
      categoryFilter: category,
      levelFilter: level,
      salaryFilter: salary,
      search,
    });

    // Once result is returned, update the jobs array to the filteredJobs data
    setJobsData({
      jobs: filteredJobs?.jobs,
      totalPages: filteredJobs?.totalPages,
    });

    // Get the property value count or frequency based on the job array and element property passed
    const createFrequencyObject = (
      jobs: Job[] | undefined
    ): JobsFrequencyData => {
      return {
        typeFrequency: countPropertyValues(jobs, "type"),
        categoryFrequency: countPropertyValues(jobs, "category"),
        levelFrequency: countPropertyValues(jobs, "level"),
        salaryFrequency: countPropertyValues(jobs, "salary"),
      };
    };

    const newFrequency = createFrequencyObject(filteredJobs?.jobs);
    const newFrequencyNoLimit = createFrequencyObject(
      filteredJobs?.jobsNoLimit
    );

    // Determine if all filters are empty
    const areFiltersEmpty = [type, category, level, salary, search].every(
      (filter) => filter.length <= 0
    );

    // Set the appropriate jobsFrequency based on whether filters are empty
    setJobsFrequency(areFiltersEmpty ? newFrequencyNoLimit : newFrequency);
    setShowLoader(false);
  };

  // console.log("jobsFrequency:", jobsFrequency);

  // Function to set the URL params keys and values
  const handleFilterChange = async (
    e: ChangeEvent<HTMLInputElement>,
    filterType: string,
    filterValue: string
  ) => {
    // Extract the checked and name variables from the e.target object
    const { checked, name } = e.target;

    if (checked) {
      // Create a key that holds an array of filterValues in the URL
      updatedParams.append(filterType, filterValue);
      // Save the checked state of the filterValue to the URL
      updatedParams.set(name, checked.toString());
    } else {
      // If checked is false, delete URL keys
      updatedParams.delete(filterType, filterValue);
      updatedParams.delete(name);
    }

    // Take user to first page
    const pageToFirst = 1;
    updatedParams.set("page", pageToFirst.toString());

    // Call the updateFilters function and pass the updated URL keys and values
    await updateFilters(updatedParams);
  };

  // Filters' data and actions
  const filtersConfig = [
    {
      title: "Type of Employment",
      type: "type",
      frequency: jobsFrequency.typeFrequency,
      toggleShowFilter: () => toggleFilterVisibility("type"),
      showFilter: filterVisibility.type,
    },
    {
      title: "Category",
      type: "category",
      frequency: jobsFrequency.categoryFrequency,
      toggleShowFilter: () => toggleFilterVisibility("category"),
      showFilter: filterVisibility.category,
    },
    {
      title: "Level",
      type: "level",
      frequency: jobsFrequency.levelFrequency,
      toggleShowFilter: () => toggleFilterVisibility("level"),
      showFilter: filterVisibility.level,
    },
    {
      title: "Salary (per annum)",
      type: "salary",
      frequency: jobsFrequency.salaryFrequency,
      toggleShowFilter: () => toggleFilterVisibility("salary"),
      showFilter: filterVisibility.salary,
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
