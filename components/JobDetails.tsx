import JobDetailHeader from "./JobDetailHeader";
import DOMPurify from "isomorphic-dompurify";
import JobDetailsCompany from "./JobDetailsCompany";

type JobProps = {
  job: Job;
  company: Company;
};

const JobDetails = ({ job, company }: JobProps) => {
  const cleanLongDescription = DOMPurify.sanitize(
    job.long_description ? job.long_description : ""
  );

  return (
    <section>
      <div className="flex gap-4">
        <div className="w-[70%]">
          <JobDetailHeader job={job} />
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{
              __html: cleanLongDescription,
            }}
          />
        </div>
        <JobDetailsCompany company={company} />
      </div>
    </section>
  );
};

export default JobDetails;
