import useClickOutside from "@/hooks/useClickOutside";
import { sortArray, sortSalaryRanges } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

type SavedJobsTableHeadProps = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SavedJobsTableHead = ({
  jobs,
  setJobs,
  checkedItems,
  selectAll,
}: SavedJobsTableHeadProps) => {
  const [openTitleSorting, setOpenTitleSorting] = useState(false);
  const [openSalarySorting, setOpenSalarySorting] = useState(false);
  const sortingTitleModalRef = useRef<HTMLDivElement>(null);
  const sortingSalaryModalRef = useRef<HTMLDivElement>(null);

  const filterTitleByOrder = (order: string) => {
    const sortedJobs = sortArray(jobs ?? [], "title", order);
    setJobs(sortedJobs);
    setOpenTitleSorting(false);
  };

  const filterSalaryByOrder = (order: string) => {
    const sortedJobs = sortSalaryRanges(jobs ?? [], "salary", order);
    setJobs(sortedJobs);
    setOpenSalarySorting(false);
  };

  // Handle clicks outside title sorting modal
  useClickOutside(sortingTitleModalRef, () => {
    setOpenTitleSorting(false);
  });

  // Handle clicks outside salary sorting modal
  useClickOutside(sortingSalaryModalRef, () => {
    setOpenSalarySorting(false);
  });

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    action: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <thead className="border border-gray-300">
      <tr>
        <th className="p-3">
          <input
            className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
            type="checkbox"
            onChange={selectAll}
            checked={
              !jobs?.length
                ? false
                : Object.keys(checkedItems).length === jobs?.length &&
                  Object.values(checkedItems).every((value) => value)
            }
          />
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingTitleModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenTitleSorting((prev) => !prev)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => setOpenTitleSorting((prev) => !prev))
              }
              tabIndex={0}
              role="button"
              aria-haspopup="true"
              aria-expanded={openTitleSorting}
            >
              <p className="w-max text-left">Title</p>
              <div className="flex flex-col">
                <Image
                  className="font-medium"
                  src="/chevron-arrow-up.svg"
                  width={12}
                  height={12}
                  alt="sort"
                />
                <Image
                  className="font-medium"
                  src="/chevron-arrow-down.svg"
                  width={12}
                  height={12}
                  alt="sort"
                />
              </div>
            </div>
            {openTitleSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <button
                  className="text-sm font-light py-1 px-1 cursor-pointer text-left hover:bg-gray-200"
                  onClick={() => filterTitleByOrder("asc")}
                >
                  ascending
                </button>
                <button
                  className="text-sm font-light py-1 px-1 cursor-pointer text-left hover:bg-gray-200"
                  onClick={() => filterTitleByOrder("desc")}
                >
                  descending
                </button>
              </div>
            )}
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Type</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div className="w-fit text-left relative">
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <p className="w-max text-left">Level</p>
            </div>
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingSalaryModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-max"
              onClick={() => setOpenSalarySorting((prev) => !prev)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => setOpenSalarySorting((prev) => !prev))
              }
              tabIndex={0}
              role="button"
              aria-haspopup="true"
              aria-expanded={openSalarySorting}
            >
              <p className="w-max text-left">Salary / yr</p>
              <div className="flex flex-col">
                <Image
                  className="font-medium"
                  src="/chevron-arrow-up.svg"
                  width={12}
                  height={12}
                  alt="sort"
                />
                <Image
                  className="font-medium"
                  src="/chevron-arrow-down.svg"
                  width={12}
                  height={12}
                  alt="sort"
                />
              </div>
            </div>
            {openSalarySorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <button
                  className="text-sm font-light py-1 px-1 cursor-pointer text-left hover:bg-gray-200"
                  onClick={() => filterSalaryByOrder("asc")}
                >
                  ascending
                </button>
                <button
                  className="text-sm font-light py-1 px-1 cursor-pointer text-left hover:bg-gray-200"
                  onClick={() => filterSalaryByOrder("desc")}
                >
                  descending
                </button>
              </div>
            )}
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Location</th>
        <th className="text-left text-gray-800 font-normal p-3">Company</th>
        <th className="text-left text-gray-800 font-normal p-3">Capacity</th>
      </tr>
    </thead>
  );
};

export default SavedJobsTableHead;
