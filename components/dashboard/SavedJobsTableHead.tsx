import Image from "next/image";

const SavedJobsTableHead = () => {
  return (
    <thead className="border border-gray-300">
      <tr>
        <th className="p-3">
          <input
            className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
            type="checkbox"
          />
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div className="w-fit text-left relative">
            <div className="flex items-center justify-start gap-2 cursor-pointer w-fit">
              <p className="text-sm text-left">Title</p>
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
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">Type</th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div className="w-fit text-left relative">
            <div className="flex items-center justify-start gap-2 cursor-pointer w-fit">
              <p className="text-sm text-left">Level</p>
            </div>
          </div>
        </th>
        <th className="text-left text-gray-800 font-normal p-3">
          <div className="w-fit text-left relative">
            <div className="flex items-center justify-start gap-2 cursor-pointer w-fit">
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
