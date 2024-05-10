import JobList from "./JobList";
import { useState } from "react";
import ListLayout from "./ListLayout";
import Pagination from "./Pagination";
import Loader from "./Loader";

type JobsFromFilterProps = {
  jobs: Job[] | undefined;
  totalPages: number | undefined;
  page: number;
  showLoader: boolean;
};

const JobsFromFilter = ({
  jobs,
  totalPages,
  page,
  showLoader,
}: JobsFromFilterProps) => {
  const [layout, setLayout] = useState<"row" | "column">("row");

  return (
    <section className="w-[80%]">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">All jobs</h2>
          <p className="text-sm">Showing {jobs?.length} results</p>
        </div>
        <span className="flex items-center gap-3">
          <ListLayout layout={layout} setLayout={setLayout} />
        </span>
      </div>
      {showLoader ? (
        <div className="flex items-center justify-center mt-16">
          <Loader className="loader" />
        </div>
      ) : (
        <>
          <JobList type="all" jobs={jobs} layout={layout} />
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </section>
  );
};

export default JobsFromFilter;
