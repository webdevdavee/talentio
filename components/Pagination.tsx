"use client";

import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type PaginationProps = {
  page: number;
};

const Pagination = ({ page }: PaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = new URLSearchParams(searchParams.toString());

  const [inputValue, setInputValue] = useState<string | number>("");

  // Go to previous page
  const prevPage = () => {
    // Decrement the page number
    const prevPage = page - 1;
    // Set the url param to the prevPage value
    pageParam.set("page", prevPage.toString());
    const categoryURL = createURL(pathname, pageParam);
    router.push(`${categoryURL}`);
  };

  // Go to next page
  const nextPage = () => {
    // Increment the page number
    const nextPage = page + 1;
    // Set the url param to the nextPage value
    pageParam.set("page", nextPage.toString());
    const categoryURL = createURL(pathname, pageParam);
    router.push(`${categoryURL}`);
  };

  // Paginate through pages from input
  const paginateOnInput = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    // Set the url param to the value param
    pageParam.set("page", value);
    const categoryURL = createURL(pathname, pageParam);
    router.push(`${categoryURL}`);
  };

  useEffect(() => {
    setInputValue(page);
  }, [page]);

  return (
    <section className="w-full flex justify-end">
      <div className="flex items-center gap-3 mt-4">
        <button type="button" onClick={prevPage}>
          Prev
        </button>
        <form onSubmit={(e) => paginateOnInput(e, inputValue as string)}>
          <input
            type="text"
            inputMode="numeric"
            className="w-[4rem] px-3 py-2 border border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <button type="button" onClick={nextPage}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
