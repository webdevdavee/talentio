"use client";

import JobDetailHeader from "./JobDetailHeader";
import DOMPurify from "isomorphic-dompurify";
import JobDetailsCompany from "./JobDetailsCompany";
import JobApplicationForm from "./JobApplicationForm";
import { useState } from "react";

type JobProps = {
  job: Job;
  company: Company;
};

const JobDetails = ({ job, company }: JobProps) => {
  const [showForm, setShowForm] = useState(false);

  const cleanLongDescription = DOMPurify.sanitize(
    job.long_description ? job.long_description : ""
  );

  return (
    <section>
      <div className="flex gap-4">
        <div className="w-[70%]">
          <JobDetailHeader
            job={job}
            showForm={showForm}
            setShowForm={setShowForm}
          />
          {showForm ? (
            <JobApplicationForm />
          ) : (
            <>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: cleanLongDescription,
                }}
              />
            </>
          )}
        </div>
        <JobDetailsCompany company={company} />
      </div>
    </section>
  );
};

export default JobDetails;
