"use client";

import Image from "next/image";
import CompanyDetailsHeader from "./CompanyDetailsHeader";

type CompanyDetailsProps = {
  company: Company;
};

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
  return (
    <section className="w-full">
      <CompanyDetailsHeader company={company} />
      <div className="flex gap-8 mt-4">
        <div className="w-[60%]">
          <p>{company.about}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-medium">Contact</h3>
          <span className="flex gap-4 flex-wrap">
            {company.contact.map((contact, index) => (
              <button
                key={index}
                type="button"
                className="flex items-center gap-3 p-2 border border-primary"
              >
                <Image src={contact.logo} width={20} height={20} alt="icon" />
                <p>{contact.link}</p>
              </button>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
