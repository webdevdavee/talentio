"use client";

import { useState } from "react";
import TableUtitlity from "./TableUtitlity";
import SavedJobsTable from "./SavedJobsTable";
import Pagination from "../Pagination";

type SavedJobsWrapperProps = {
  jobsDetails: Job[];
  page: number;
  totalPages: number | undefined;
  perPage: number;
};

const SavedJobsWrapper = ({
  jobsDetails,
  page,
  totalPages,
  perPage,
}: SavedJobsWrapperProps) => {
  const [query, setQuery] = useState("");

  // Create an array based on the search input
  const filteredJobSearch = jobsDetails?.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.type.toLowerCase().includes(query.toLowerCase()) ||
      job.level.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-6">
      <TableUtitlity
        query={query}
        setQuery={setQuery}
        title="Total saved jobs:"
        filteredJobSearch={filteredJobSearch}
        perPage={perPage}
      />
      <SavedJobsTable jobs={filteredJobSearch} />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default SavedJobsWrapper;
