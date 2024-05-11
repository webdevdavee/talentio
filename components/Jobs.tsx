"use client";

import React, { useEffect, useState } from "react";
import JobsFromFilter from "./JobsFromFilter";
import JobsFilterBar from "./JobsFilterBar";
import { getJobs, handleJobFilter } from "@/database/actions/job.actions";
import { useSearchParams } from "next/navigation";
import { countPropertyValues } from "@/lib/utils";

type JobsProps = {
  fetchedJobs: GetJob | undefined;
  page: number;
  typeFrequency: JobsFilterFrequency[];
  categoryFrequency: JobsFilterFrequency[];
  levelFrequency: JobsFilterFrequency[];
  salaryFrequency: JobsFilterFrequency[];
};

const Jobs = ({
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

  // Function to fetch jobs
  const fetchJobs = async () => {
    setShowLoader(true);
    const jobs = await getJobs(page);
    setJobsData({ jobs: jobs?.jobs, totalPages: jobs?.totalPages });
    setShowLoader(false);
  };

  // Function to fetch jobs based on filters that have been applied
  const fetchFilteredJobs = async () => {
    setShowLoader(true);

    const filteredJobs: GetJob2 | undefined = await handleJobFilter(
      type,
      category,
      level,
      salary,
      search,
      page
    );
    setJobsData({
      jobs: filteredJobs?.jobs,
      totalPages: filteredJobs?.totalPages,
    });

    // Get the property value count or frequency based on the type of job array passed
    const createFrequencyObject = (
      jobs: Job[] | undefined
    ): JobsFrequencyData => {
      return {
        typeFrequency: countPropertyValues(jobs, "type"),
        categoryFrequency: countPropertyValues(jobs, "name"),
        levelFrequency: countPropertyValues(jobs, "level"),
        salaryFrequency: countPropertyValues(jobs, "salary"),
      };
    };

    const newFrequency = createFrequencyObject(filteredJobs?.jobs);
    const newFrequencyNoLimit = createFrequencyObject(
      filteredJobs?.jobsNoLimit
    );

    // Set the appropriate jobsFrequency based on whether filters are empty
    setNewJobsPropertyCount(
      areFiltersEmpty ? newFrequencyNoLimit : newFrequency
    );
    setShowLoader(false);
  };

  // const getJobSearch = async () => {
  //   const [value1, value2] = search;
  //   // Fetch jobs from search
  //   const jobs: GetJob | undefined = await searchJobFromInput(value1, value2);
  //   // Set the jobs data to the response from the search
  //   setJobsData({ jobs: jobs?.jobs, totalPages: jobs?.totalPages });
  //   // Fetch jobs property count or frequency
  //   const fetchJobsPropertyCount = (
  //     jobs: Job[] | undefined
  //   ): JobsFrequencyData => {
  //     return {
  //       typeFrequency: countPropertyValues(jobs, "type"),
  //       categoryFrequency: countPropertyValues(jobs, "name"),
  //       levelFrequency: countPropertyValues(jobs, "level"),
  //       salaryFrequency: countPropertyValues(jobs, "salary"),
  //     };
  //   };
  //   setNewJobsPropertyCount(fetchJobsPropertyCount(jobs?.jobs));
  // };

  useEffect(() => {
    if (areFiltersEmpty) {
      fetchJobs();
    } else {
      fetchFilteredJobs();
    }
  }, [page, areFiltersEmpty]);

  return (
    <div className="w-full flex items-start justify-start gap-8 p-16">
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
