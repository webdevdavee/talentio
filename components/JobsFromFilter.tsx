import JobList from "./JobList";
import { useState } from "react";
import ListLayout from "./ListLayout";
import Pagination from "./Pagination";

type JobsFromFilterProps = {
  jobs: Job[] | undefined;
  totalPages: number | undefined;
  page: number;
};

const JobsFromFilter = ({ jobs, totalPages, page }: JobsFromFilterProps) => {
  const [layout, setLayout] = useState<"row" | "column">("row");

  return (
    <section className="w-[80%]">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">All jobs</h2>
          <p className="text-sm">Showing {jobs?.length} results</p>
        </div>
        <span className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 cursor-pointer" />
            <p>Show latest</p>
          </div>
          <div className="border h-[1rem] border-slate-300"></div>
          <ListLayout layout={layout} setLayout={setLayout} />
        </span>
      </div>
      <JobList type="all" jobs={jobs} layout={layout} />
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
};

export default JobsFromFilter;
