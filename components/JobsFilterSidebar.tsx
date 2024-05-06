import Image from "next/image";

const JobsFilterSidebar = () => {
  return (
    <aside className="w-[20%]">
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Type of Employement</h3>
          <Image src="/arrow-up.svg" width={18} height={18} alt="arrow-up" />
        </div>
        <div>
          <span className="flex items-center gap-4">
            <input type="checkbox" name="" id="" />
            <p>Test type</p>
          </span>
        </div>
      </section>
    </aside>
  );
};

export default JobsFilterSidebar;
