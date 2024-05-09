"use client";

import React, { useEffect, useState } from "react";
import JobsFromFilter from "./JobsFromFilter";
import JobsFilterBar from "./JobsFilterBar";
import {
  getJobs,
  getJobsWithFrequency,
  handleFilter,
} from "@/database/actions/job.actions";
import { useSearchParams } from "next/navigation";

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
  const [jobsData, setJobsData] = useState({
    jobs: fetchedJobs?.jobs,
    totalPages: fetchedJobs?.totalPages,
  });
  const searchParams = useSearchParams();
  const jobsParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const [type, category, level, salary] = [
      "type",
      "category",
      "level",
      "salary",
    ].map((key) => jobsParams.getAll(key));

    if (
      type.length <= 0 &&
      category.length <= 0 &&
      level.length <= 0 &&
      salary.length <= 0
    ) {
      const fetchJobs = async () => {
        const jobs = await getJobs(page);
        setJobsData({ jobs: jobs?.jobs, totalPages: jobs?.totalPages });
      };
      fetchJobs();
    } else {
      const fetchFilteredJobs = async () => {
        const filteredJobs: GetJob | undefined = await handleFilter(
          type,
          category,
          level,
          salary,
          page
        );
        setJobsData({
          jobs: filteredJobs?.jobs,
          totalPages: filteredJobs?.totalPages,
        });
      };
      fetchFilteredJobs();
    }
  }, [page]);

  return (
    <div className="w-full flex items-start justify-start gap-8 p-16">
      <JobsFilterBar
        setJobsData={setJobsData}
        typeFrequency={typeFrequency}
        categoryFrequency={categoryFrequency}
        levelFrequency={levelFrequency}
        salaryFrequency={salaryFrequency}
        page={page}
      />
      <JobsFromFilter
        jobs={jobsData.jobs}
        totalPages={jobsData.totalPages}
        page={page}
      />
    </div>
  );
};

export default Jobs;
