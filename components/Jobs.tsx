"use client";

type JobsProps = {
  page: number;
};

import React, { useEffect, useState } from "react";
import JobsFromFilter from "./JobsFromFilter";
import { getJobs } from "@/database/actions/job.actions";
import JobsFilterBar from "./JobsFilterBar";

const Jobs = ({ page }: JobsProps) => {
  const [jobsData, setJobsData] = useState({
    jobs: [] as Job[] | undefined,
    totalPages: undefined as number | undefined,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs: GetJob | undefined = await getJobs(page);
      const jobs: Job[] | undefined = fetchedJobs?.jobs;
      const totalPages: number | undefined = fetchedJobs?.totalPages;
      setJobsData({ jobs, totalPages });
    };
    fetchJobs();
  }, [page]);

  return (
    <div className="w-full flex items-start justify-start gap-8 p-16">
      <JobsFilterBar />
      <JobsFromFilter
        jobs={jobsData.jobs}
        totalPages={jobsData.totalPages}
        page={page}
      />
    </div>
  );
};

export default Jobs;
