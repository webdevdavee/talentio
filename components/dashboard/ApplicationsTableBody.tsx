import { convertDateFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ApplicationTableBodyProps = {
  jobs: Job[];
};

const ApplicationsTableBody = ({ jobs }: ApplicationTableBodyProps) => {
  return (
    <tbody className="border border-gray-300">
      {jobs.map((job) => (
        <tr>
          <th className="p-3">
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
            />
          </th>
          <td className="text-sm w-max p-3">
            <Link
              href={`/job/${job._id}`}
              className="flex items-center gap-3 underline"
            >
              <Image src={job.companylogo} width={20} height={20} alt="img" />
              <p>{job.company}</p>
            </Link>
          </td>
          <td className="text-sm w-max p-3">{job.title}</td>
          <td className="text-sm w-max p-3">
            {convertDateFormat(job.applicationDate as Date)}
          </td>
          <td className="text-sm w-max p-3">{job.salary}</td>
          <td className="text-sm w-max p-3">
            <button type="button" className="bg-primary text-white p-2">
              See application
            </button>
          </td>
          <td className="text-sm w-max p-3">
            <Image
              src="/three-dots.svg"
              width={20}
              height={20}
              alt="more-option"
              className="cursor-pointer"
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ApplicationsTableBody;
