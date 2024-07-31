import useClickOutside from "@/hooks/useClickOutside";
import { sortArray, sortSalaryRanges } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

type ApplicationsTableHeadProps = {
  applications: UserApplication[];
  setApplications: React.Dispatch<React.SetStateAction<UserApplication[]>>;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ApplicationsTableHead = ({
  applications,
  setApplications,
  checkedItems,
  selectAll,
}: ApplicationsTableHeadProps) => {
  const [openDateSorting, setOpenDateSorting] = useState(false);
  const [openSalarySorting, setOpenSalarySorting] = useState(false);
  const sortingDateModalRef = useRef<HTMLDivElement>(null);
  const sortingSalaryModalRef = useRef<HTMLDivElement>(null);

  const filterDateByOrder = (order: string) => {
    const sortedApplications = sortArray(
      applications ?? [],
      "createdAt",
      order
    );
    setApplications(sortedApplications);
    setOpenDateSorting(false);
  };

  const filterSalaryByOrder = (order: string) => {
    const sortedApplications = sortSalaryRanges(
      applications ?? [],
      "job.salary",
      order
    );
    setApplications(sortedApplications);
    setOpenSalarySorting(false);
  };

  // Handle clicks outside title sorting modal
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
              !applications?.length
                ? false
                : Object.keys(checkedItems).length === applications?.length &&
                  Object.values(checkedItems).every((value) => value)
            }
          />
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Company</th>
        <th className="text-left text-gray-800 font-normal p-3">Role</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingDateModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-max"
              onClick={() => setOpenDateSorting((prev) => !prev)}
            >
              <p className="text-left w-max">Date</p>
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
              <p className="text-left w-max">Salary / yr</p>
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
