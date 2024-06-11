import { sortArray } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ApplicationsTableHeadProps = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const ApplicationsTableHead = ({
  jobs,
  setJobs,
}: ApplicationsTableHeadProps) => {
  const [openDateSorting, setOpenDateSorting] = useState(false);
  const [openSalarySorting, setOpenSalarySorting] = useState(false);

  const filterDateByAscendingOrder = () => {
    const sortedproducts = sortArray(
      jobs ? jobs : [],
      "applicationDate",
      "asc"
    );
    setJobs(sortedproducts);
    setOpenDateSorting(false);
  };

  const filterDateByDescendingOrder = () => {
    const sortedproducts = sortArray(
      jobs ? jobs : [],
      "applicationDate",
      "desc"
    );
    setJobs(sortedproducts);
    setOpenDateSorting(false);
  };

  const filterSalaryByAscendingOrder = () => {
    const sortedproducts = sortArray(
      jobs ? jobs : [],
      "applicationSalary",
      "asc"
    );
    setJobs(sortedproducts);
    setOpenSalarySorting(false);
  };

  const filterSalaryByDescendingOrder = () => {
    const sortedproducts = sortArray(
      jobs ? jobs : [],
      "applicationSalary",
      "desc"
    );
    setJobs(sortedproducts);
    setOpenSalarySorting(false);
  };

  return (
    <thead className="border border-gray-300">
      <tr>
        <th className="p-3">
          <input
            className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
            type="checkbox"
          />
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Company</th>
        <th className="text-left text-gray-800 font-normal p-3">Role</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenDateSorting(!openDateSorting)}
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
              <div className="flex flex-col absolute bg-white py-2 px-1 rounded-lg drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterDateByAscendingOrder}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterDateByDescendingOrder}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenSalarySorting(!openSalarySorting)}
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
              <div className="flex flex-col absolute bg-white py-2 px-1 rounded-lg drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterSalaryByAscendingOrder}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterSalaryByDescendingOrder}
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
