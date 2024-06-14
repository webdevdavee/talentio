import Image from "next/image";

const JobViews = () => {
  return (
    <section className="border border-gray-200 p-4 h-fit">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Job views</h2>
          <Image
            src="/eye.svg"
            width={30}
            height={30}
            alt="eye"
            className="bg-[#FFC700] p-2 rounded-full"
          />
        </div>
        <p className="text-3xl font-medium">2,345</p>
        <p>
          This week <span className="text-green-600">6.4% up</span>
        </p>
      </div>
    </section>
  );
};

export default JobViews;
