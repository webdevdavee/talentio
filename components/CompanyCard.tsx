import Image from "next/image";

type CompanyCard = {
  company: Company;
  type?: string;
  layout?: string;
};

const CompanyCard = ({ company, type, layout }: CompanyCard) => {
  return (
    <section
      className={`border border-zinc-300 p-5 duration-200 transition cursor-pointer ${
        !type && "hover:scale-105"
      }`}
    >
      <div className="flex flex-col items-start justify-between h-full gap-3">
        <div className="w-full h-[4.2rem] overflow-hidden">
          <Image
            src={company.logo}
            width={50}
            height={50}
            quality={100}
            alt={company.company}
          />
        </div>
        <p className="text-lg font-bold text-left">{company.company}</p>
        <p className="text-left">
          {(company.about.length > 55 && type === "recommended") ||
          layout === "column"
            ? company.about.slice(0, 55) + "..."
            : company.about}
        </p>
        <span className="flex flex-wrap items-center gap-3">
          {company.industry.map((data, index) => (
            <p
              key={index}
              className="border border-[#272829] px-2 py-1 rounded-xl text-sm"
            >
              {data}
            </p>
          ))}
        </span>
      </div>
    </section>
  );
};

export default CompanyCard;
