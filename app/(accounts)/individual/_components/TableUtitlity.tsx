"use client";

import { ChangeEvent } from "react";
import PerPage from "../../../../components/dashboard/PerPage";
import Searchbar from "../../../../components/dashboard/Searchbar";
import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TableUtitlityProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  filteredSearch?: UserApplication[] | Job[];
  perPage: number;
  deleteBtnText: string;
  deleteFunction: () => Promise<void>;
  searchPlaceholder: string;
};

const TableUtitlity = ({
  query,
  setQuery,
  title,
  filteredSearch,
  perPage,
  deleteBtnText,
  deleteFunction,
  searchPlaceholder,
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
    <div className="flex items-center justify-between m:flex-col m:items-start m:gap-4 xl:flex-col xl:items-start xl:gap-4">
      <h2 className="text-xl font-semibold m:text-lg xl:text-lg">
        {title} {filteredSearch?.length}
      </h2>
      <div className="flex items-center gap-8 m:flex-col m:gap-5 m:w-full xl:w-full xl:flex-col xl:gap-4">
        <div className="flex items-center justify-center gap-3 m:flex-col m:w-full xl:w-full">
          <div className="flex justify-between gap-2 m:w-full xl:w-full">
            <button
              type="button"
              className="py-2 px-3 border-[1px] border-gray-400 text-sm m:w-full xl:w-full"
              onClick={deleteFunction}
            >
              {deleteBtnText}
            </button>
          </div>
        </div>
        <PerPage perPage={perPage} handlePerPage={handlePerPage} />
        <Searchbar
          query={query}
          setQuery={setQuery}
          placeholder={searchPlaceholder}
        />
      </div>
    </div>
  );
};

export default TableUtitlity;
