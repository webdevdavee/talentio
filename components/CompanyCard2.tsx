import Image from "next/image";

type CompanyCard2Props = {
  company: Company;
};

const CompanyCard2 = ({ company }: CompanyCard2Props) => {
  return (
    <section className="bg-white border border-zinc-300 p-5 hover:scale-105 duration-200 transition cursor-pointer">
      <div className="flex flex-col gap-3 items-center justify-center">
        <Image
          src={company.logo}
          width={25}
          height={25}
          alt={company.company}
        />
        <p>{company.company}</p>
      </div>
    </section>
  );
};

export default CompanyCard2;
