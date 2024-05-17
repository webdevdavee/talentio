import Image from "next/image";

type CompanyDetailsHeaderProps = {
  company: Company;
};

const CompanyDetailsHeader = ({ company }: CompanyDetailsHeaderProps) => {
  return (
    <header className="w-full">
      <div className="w-full flex gap-16 border-b border-b-gray-200 pb-8">
        <Image
          src={company.logo}
          width={140}
          height={140}
          alt={company.company}
        />
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">{company.company}</h1>
          <div className="flex items-center justify-start gap-10">
            <span className="flex gap-3 items-start justify-start">
              <Image src="/people.svg" width={20} height={20} alt="people" />
              <span className="flex flex-col gap-2">
                <p>Employee size</p>
                <p className="font-medium">{company.company_size}</p>
              </span>
            </span>
            <span className="flex gap-3 items-start justify-start">
              <Image
                src="/location.svg"
                width={20}
                height={20}
                alt="location"
              />
              <span className="flex flex-col gap-2">
                <p>Location</p>
                <p className="font-medium">15+ countries</p>
              </span>
            </span>
            <span className="flex gap-3 items-start justify-start">
              <Image
                src="/building.svg"
                width={20}
                height={20}
                alt="building"
              />
              <span className="w-full flex flex-col gap-2">
                <p>Industry</p>
                <div className="w-full flex items-center gap-3 font-medium">
                  {company.industry.map((industry, index) => (
                    <p key={index}>
                      {industry}
                      {index < company.industry.length - 1 ? "," : ""}
                    </p>
                  ))}
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyDetailsHeader;
