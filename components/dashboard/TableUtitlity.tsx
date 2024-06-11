"use client";

import { ChangeEvent, useState } from "react";
import PerPage from "./PerPage";
import Searchbar from "./Searchbar";
import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TableUtitlityProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  filteredJobSearch?: Job[];
  perPage: number;
};

const TableUtitlity = ({
  query,
  setQuery,
  title,
  filteredJobSearch,
  perPage,
}: TableUtitlityProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPageParam = new URLSearchParams(searchParams.toString());

  // Go to next page
  const handlePerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // Increment the page number
    const newPerPage = value;
    // Set the url param to the nextPage value
    perPageParam.set("perPage", newPerPage.toString());
    const url = createURL(pathname, perPageParam);
    router.push(url);
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        {title} {filteredJobSearch?.length}
      </h2>
      <div className="flex items-center gap-8">
        <PerPage perPage={perPage} handlePerPage={handlePerPage} />
        <Searchbar
          query={query}
          setQuery={setQuery}
          placeholder="Search jobs"
        />
      </div>
    </div>
  );
};

export default TableUtitlity;
