import Image from "next/image";
import Link from "next/link";

type JobDetailsCompanyProps = {
  company: Company;
};

const JobDetailsCompany = ({ company }: JobDetailsCompanyProps) => {
  return (
    <section className="w-[30%] flex flex-col items-center justify-start gap-5 p-3 border-l border-l-gray-200 pl-4 m:w-full m:border-none">
      <div className="w-full flex flex-col items-center justify-start gap-4 border-b border-b-gray-200 pb-6 m:border-t m:border-t-gray-200 m:pt-6">
        <Image
          src={company.logo}
          width={50}
          height={50}
          alt={company.company}
        />
        <p className="font-semibold">{company.company}</p>
        <Link
          href={`/company/${company._id}`}
          className="px-4 py-3 text-white text-sm bg-primary font-medium"
        >
          View company profile
        </Link>
      </div>
      <div className="w-full flex flex-col items-start gap-6">
        <span className="flex flex-col gap-3">
          <b>About company</b>
          <p>{company.about}</p>
        </span>
        <span className="flex flex-col gap-3">
          <b>Industry</b>
          <span className="flex items-center gap-2 flex-wrap">
            {company.industry.map((industry, index) => (
              <p key={index}>
                {industry}
                {index < company.industry.length - 1 ? "," : ""}
              </p>
            ))}
          </span>
        </span>
        <span className="flex flex-col gap-3">
          <b>Company Size</b>
          <p>{company.company_size}</p>
        </span>
      </div>
    </section>
  );
};

export default JobDetailsCompany;
