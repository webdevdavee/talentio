import useClickOutside from "@/hooks/useClickOutside";
import { sortArray } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

type ApplicantsTableHeadProps = {
  applicants: UserApplication[];
  setApplicants: React.Dispatch<React.SetStateAction<UserApplication[]>>;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ApplicantsTableHead = ({
  applicants,
  setApplicants,
  checkedItems,
  selectAll,
}: ApplicantsTableHeadProps) => {
  const [openDateSorting, setOpenDateSorting] = useState(false);
  const [openScoreSorting, setOpenScoreSorting] = useState(false);
  const sortingDateModalRef = useRef<HTMLDivElement>(null);
  const sortingScoreModalRef = useRef<HTMLDivElement>(null);

  const filterDateByOrder = (order: string) => {
    const sortedApplicants = sortArray(
      applicants ? applicants : [],
      "createdAt",
      order
    );
    setApplicants(sortedApplicants);
    setOpenDateSorting(false);
  };

  const filterScoreByOrder = (order: string) => {
    const sortedApplicants = sortArray(
      applicants ? applicants : [],
      "score",
      order
    );
    setApplicants(sortedApplicants);
    setOpenScoreSorting(false);
  };

  // Handle clicks outside date sorting modal
  useClickOutside(sortingDateModalRef, () => {
    setOpenDateSorting(false);
  });

  // Handle clicks outside score sorting modal
  useClickOutside(sortingScoreModalRef, () => {
    setOpenScoreSorting(false);
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
              !applicants?.length
                ? false
                : Object.keys(checkedItems).length === applicants?.length &&
                  Object.values(checkedItems).every((value) => value)
            }
          />
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Full name</th>
        <th className="text-left text-gray-800 font-normal p-3">Email</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingScoreModalRef} className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenScoreSorting((prev) => !prev)}
            >
              <p className="text-sm text-left">Score</p>
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
            {openScoreSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterScoreByOrder("asc")}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={() => filterScoreByOrder("desc")}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div ref={sortingDateModalRef} className="w-fit text-left relative">
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
        <th className="text-left text-gray-800 font-normal p-3">Role</th>
        <th className="text-left text-gray-800 font-normal p-3">
          Hiring stage
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Action</th>
      </tr>
    </thead>
  );
};

export default ApplicantsTableHead;
