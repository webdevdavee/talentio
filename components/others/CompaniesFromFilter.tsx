import { useState } from "react";
import ListLayout from "../ui/ListLayout";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import CompaniesList from "./CompaniesList";

type CompaniesFromFilterProps = {
  companies: Company[] | undefined;
  totalPages: number | undefined;
  page: number;
  showLoader: boolean;
};

const CompaniesFromFilter = ({
  companies,
  totalPages,
  page,
  showLoader,
}: CompaniesFromFilterProps) => {
  const [layout, setLayout] = useState<"row" | "column">("row");

  return (
    <section className="w-[80%] m:w-full">
      <div className="flex items-center justify-between mb-12 m:mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">All companies</h2>
          <p className="text-sm">Showing {companies?.length} results</p>
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
          <CompaniesList type="search" companies={companies} layout={layout} />
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </section>
  );
};

export default CompaniesFromFilter;
