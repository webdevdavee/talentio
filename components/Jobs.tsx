"use client";

import React, { useEffect, useState } from "react";
import JobsFromFilter from "./JobsFromFilter";
import JobsFilterBar from "./JobsFilterBar";
import { handleJobFilter } from "@/database/actions/job.actions";
import { useSearchParams } from "next/navigation";
import { countPropertyValues, handleError } from "@/lib/utils";

type JobsProps = {
  pageType?: string;
  fetchedJobs: GetJob | undefined;
  page: number;
  typeFrequency: JobsFilterFrequency[];
  categoryFrequency: JobsFilterFrequency[];
  levelFrequency: JobsFilterFrequency[];
  salaryFrequency: JobsFilterFrequency[];
};

const Jobs = ({
  pageType,
  fetchedJobs,
  page,
  typeFrequency,
  categoryFrequency,
  levelFrequency,
  salaryFrequency,
}: JobsProps) => {
  const searchParams = useSearchParams();
  const jobsParams = new URLSearchParams(searchParams.toString());

  const [showLoader, setShowLoader] = useState(false);

  const [jobsData, setJobsData] = useState({
    jobs: fetchedJobs?.jobs,
    totalPages: fetchedJobs?.totalPages,
  });

  const [newJobsPropertyCount, setNewJobsPropertyCount] =
    useState<JobsFrequencyData>();

  // Get the url keys
  const [type, category, level, salary, search] = [
    "type",
    "category",
    "level",
    "salary",
    "search",
  ].map((key) => jobsParams.getAll(key));

  // Determine if all filters are empty
  const areFiltersEmpty = [type, category, level, salary, search].every(
    (filter) => filter.length <= 0
  );

  // Function to fetch jobs based on if filters are applied or not
  const fetchJobs = async () => {
    try {
      setShowLoader(true);

      // Function to fetch jobs from filters and if no filters fetch jobs regardless of filter
      const jobs: GetJob | undefined = await handleJobFilter(
        type,
        category,
        level,
        salary,
        search,
        page
      );

      setJobsData({
        jobs: jobs?.jobs,
        totalPages: jobs?.totalPages,
      });

      // Get the property value count or frequency based on the type of job array and element property passed
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

      const newFrequency = createFrequencyObject(jobs?.jobs);
      const newFrequencyNoLimit = createFrequencyObject(jobs?.jobsNoLimit);

      // Set the appropriate jobsFrequency based on whether filters are empty
      setNewJobsPropertyCount(
        areFiltersEmpty ? newFrequencyNoLimit : newFrequency
      );

      setShowLoader(false);
    } catch (error) {
      handleError(error);
    }
  };

  // If areFiltersEmpty is true run the fetchJobs() function, if not, run the fetchjobs(). This useEffect only runs when either of page, value1 or value2 changes
  const [value1, value2] = search;

  useEffect(() => {
    fetchJobs();
  }, [page, areFiltersEmpty, value1, value2]);

  return (
    <div
      className={`w-full flex items-start justify-start gap-8 p-16 ${
        pageType && "px-0 py-10"
      }`}
    >
      <JobsFilterBar
        setJobsData={setJobsData}
        typeFrequency={typeFrequency}
        categoryFrequency={categoryFrequency}
        levelFrequency={levelFrequency}
        salaryFrequency={salaryFrequency}
        newJobsPropertyCount={newJobsPropertyCount}
        setShowLoader={setShowLoader}
      />
      <JobsFromFilter
        jobs={jobsData.jobs}
        totalPages={jobsData.totalPages}
        page={page}
        showLoader={showLoader}
      />
    </div>
  );
};

export default Jobs;
