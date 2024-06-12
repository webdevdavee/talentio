"use client";

import React, { useEffect, useState } from "react";
import JobsFromFilter from "./JobsFromFilter";
import JobsFilterBar from "./JobsFilterBar";
import { handleJobFilter } from "@/database/actions/job.actions";
import { useSearchParams } from "next/navigation";
import { handleError } from "@/lib/utils";

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

  // Get the url keys
  const search = jobsParams.getAll("search");

  const isSearchFilter = search.length < 0;

  // Function to fetch jobs based on if filters are applied or not
  const searchJobs = async () => {
    try {
      setShowLoader(true);

      // Function to fetch jobs from search filter and if no filter fetch jobs regardless of filter
      const jobs: GetJob | undefined = await handleJobFilter({ search, page });

      setJobsData({
        jobs: jobs?.jobs,
        totalPages: jobs?.totalPages,
      });

      setShowLoader(false);
    } catch (error) {
      handleError(error);
    }
  };

  const [value1, value2] = search;

  useEffect(() => {
    searchJobs();
  }, [page, isSearchFilter, value1, value2]);

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
