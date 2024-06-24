import useClickOutside from "@/hooks/useClickOutside";
import { sortArray, sortSalaryRanges } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

type JobsTableHeadProps = {
  jobs: Job[] | undefined;
  setJobs: React.Dispatch<React.SetStateAction<Job[] | undefined>>;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const JobsTableHead = ({
  jobs,
  setJobs,
  checkedItems,
  selectAll,
}: JobsTableHeadProps) => {
  const [openDateSorting, setOpenDateSorting] = useState(false);
  const [openSalarySorting, setOpenSalarySorting] = useState(false);
  const sortingDateModalRef = useRef<HTMLDivElement>(null);
  const sortingSalaryModalRef = useRef<HTMLDivElement>(null);

  const filterDateByOrder = (order: string) => {
    const sortedJobs = sortArray(jobs ? jobs : [], "createdAt", order);
    setJobs(sortedJobs);
    setOpenDateSorting(false);
  };

  const filterSalaryByOrder = (order: string) => {
    const sortedJobs = sortSalaryRanges(jobs ? jobs : [], "job.salary", order);
    setJobs(sortedJobs);
    setOpenSalarySorting(false);
  };

  // Handle clicks outside date sorting modal
  useClickOutside(sortingDateModalRef, () => {
    setOpenDateSorting(false);
  });

  // Handle clicks outside salary sorting modal
  useClickOutside(sortingSalaryModalRef, () => {
    setOpenSalarySorting(false);
  });

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
        <th className="text-left text-gray-800 font-normal p-3">Title</th>
        <th className="text-left text-gray-800 font-normal p-3">Type</th>
        <th className="text-left text-gray-800 font-normal p-3">Level</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingDateModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-max"
              onClick={() => setOpenDateSorting((prev) => !prev)}
            >
              <p className="w-max text-left">Date</p>
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
            {openDateSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterDateByOrder("asc")}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterDateByOrder("desc")}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingSalaryModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-max"
              onClick={() => setOpenSalarySorting((prev) => !prev)}
            >
              <p className="text-left">Salary / yr</p>
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
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterSalaryByOrder("asc")}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterSalaryByOrder("desc")}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Capacity</th>
        <th className="text-left text-gray-800 font-normal p-3">Applied</th>
      </tr>
    </thead>
  );
};

export default JobsTableHead;
