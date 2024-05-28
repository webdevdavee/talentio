"use client";

import Image from "next/image";
import CompanyDetailsHeader from "./CompanyDetailsHeader";
import CompanyTeam from "./CompanyTeam";
import { useEffect, useState } from "react";
import { getJobsByCompany } from "@/database/actions/job.actions";
import JobCard2 from "./JobCard2";

type CompanyDetailsProps = {
  company: Company;
};

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobsByCompanyName = async () => {
      const jobs = await getJobsByCompany(company.company);
      setJobs(jobs);
    };
    fetchJobsByCompanyName();
  }, [company.company]);

  return (
    <section className="w-full">
      <CompanyDetailsHeader company={company} />
      <div className="flex gap-12 mt-4">
        <div className="w-[60%] flex flex-col gap-8">
          <div className="flex flex-col gap-5 pb-8 border-b border-b-gray-200">
            <h2 className="text-2xl font-semibold">Company Profile</h2>
            <p>{company.about}</p>
          </div>
          <CompanyTeam />
        </div>
        <div className="w-[40%] flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-semibold">Contact</h3>
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
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-semibold">Open Positions</h3>
            <div className="flex flex-col gap-4">
              {jobs.length > 0 ? (
                jobs.map((job) => <JobCard2 job={job} type="company-profile" />)
              ) : (
                <p>No open jobs from {company.company}.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
