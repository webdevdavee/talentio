import useClickOutside from "@/hooks/useClickOutside";
import { sortArray, sortSalaryRanges } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

type ApplicationsTableHeadProps = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ApplicationsTableHead = ({
  jobs,
  setJobs,
  checkedItems,
  selectAll,
}: ApplicationsTableHeadProps) => {
  const [openDateSorting, setOpenDateSorting] = useState(false);
  const [openSalarySorting, setOpenSalarySorting] = useState(false);
  const sortingTitleModalRef = useRef<HTMLDivElement>(null);
  const sortingSalaryModalRef = useRef<HTMLDivElement>(null);

  const filterTitleByOrder = (order: string) => {
    const sortedJobs = sortArray(jobs ? jobs : [], "title", order);
    setJobs(sortedJobs);
    setOpenDateSorting(false);
  };

  const filterSalaryByOrder = (order: string) => {
    const sortedJobs = sortSalaryRanges(jobs ? jobs : [], "salary", order);
    setJobs(sortedJobs);
    setOpenSalarySorting(false);
  };

  // Handle clicks outside title sorting modal
  useClickOutside(sortingTitleModalRef, () => {
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
        <th className="text-left text-gray-800 font-normal p-3">Company</th>
        <th className="text-left text-gray-800 font-normal p-3">Role</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingTitleModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenDateSorting((prev) => !prev)}
            >
              <p className="text-sm text-left">Date</p>
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
                  onClick={() => filterTitleByOrder("asc")}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterTitleByOrder("desc")}
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
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenSalarySorting((prev) => !prev)}
            >
              <p className="text-sm text-left">Salary / yr</p>
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
        <th className="text-left text-gray-800 font-normal p-3">Action</th>
      </tr>
    </thead>
  );
};

export default ApplicationsTableHead;
