import Image from "next/image";

type IndustryCardProps = {
  industry: Industry;
  fetchCompanies: (industry: string) => Promise<void>;
};

const IndustryCard = ({ industry, fetchCompanies }: IndustryCardProps) => {
  return (
    <section className="p-4 border border-gray-300 bg-white hover:scale-105 hover:drop-shadow-md duration-200 transition cursor-pointer m:flex-none">
      <div
        className="flex flex-col gap-6"
        onClick={() => fetchCompanies(industry.industry)}
      >
        <p className="text-xl font-semibold">{industry.industry}</p>
        <Image
          src={industry.icon}
          width={25}
          height={25}
          alt={industry.industry}
        />
      </div>
    </section>
  );
};

export default IndustryCard;
