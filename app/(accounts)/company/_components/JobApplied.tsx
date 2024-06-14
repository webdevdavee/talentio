import Image from "next/image";

const JobApplied = () => {
  return (
    <section className="border border-gray-200 p-4 h-fit">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Job applied</h2>
          <Image
            src="/card-list-white.svg"
            width={30}
            height={30}
            alt="eye"
            className="bg-[#102C57] p-2 rounded-full"
          />
        </div>
        <p className="text-3xl font-medium">45</p>
        <p>
          This week <span className="text-red-600">0.5% down</span>
        </p>
      </div>
    </section>
  );
};

export default JobApplied;
