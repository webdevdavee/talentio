import Image from "next/image";

type JobAppliedProps = {
  companyAppliedCount: number | undefined;
  companyAppliedCountPercentage: number | undefined;
};

const JobApplied = ({
  companyAppliedCount,
  companyAppliedCountPercentage,
}: JobAppliedProps) => {
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
        <p className="text-3xl font-medium">{companyAppliedCount}</p>
        <p>
          <span
            className={
              companyAppliedCountPercentage && companyAppliedCountPercentage > 0
                ? "text-green-600"
                : companyAppliedCountPercentage &&
                  companyAppliedCountPercentage < 0
                ? "text-red-600"
                : "text-[#272829]"
            }
          >
            {companyAppliedCountPercentage && companyAppliedCountPercentage < 0
              ? Math.abs(companyAppliedCountPercentage)
              : companyAppliedCountPercentage}
            %{" "}
            {companyAppliedCountPercentage && companyAppliedCountPercentage > 0
              ? "up"
              : companyAppliedCountPercentage &&
                companyAppliedCountPercentage < 0
              ? "down"
              : "No change this week"}
          </span>{" "}
          {companyAppliedCountPercentage === 0 ? "" : "This week"}
        </p>
      </div>
    </section>
  );
};

export default JobApplied;
