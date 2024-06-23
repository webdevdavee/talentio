import Image from "next/image";
import Link from "next/link";

type CompanyCardProps = {
  company: Company;
  type?: string;
  layout?: string;
};

const CompanyCard = ({ company, type, layout }: CompanyCardProps) => {
  return (
    <Link
      href={`/company/${company._id}`}
      className="border border-zinc-300 p-5 duration-200 transition cursor-pointer hover:scale-105"
    >
      <div className="flex flex-col items-start justify-between h-full gap-3">
        <div className="w-full h-[4.2rem] overflow-hidden m:h-[3.2rem]">
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
    </Link>
  );
};

export default CompanyCard;
