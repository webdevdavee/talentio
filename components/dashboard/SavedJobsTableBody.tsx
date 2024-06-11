import Image from "next/image";
import Link from "next/link";

type SavedJobsTableBodyProps = {
  jobs: Job[];
};

const SavedJobsTableBody = ({ jobs }: SavedJobsTableBodyProps) => {
  return (
    <tbody className="border border-gray-300">
      {jobs.map((job) => (
        <tr key={job._id}>
          <th className="p-3">
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
            />
          </th>
          <td className="text-sm w-max p-3 underline">
            <Link href={`/job/${job._id}`}>{job.title}</Link>
          </td>
          <td className="text-sm w-max p-3">{job.type}</td>
          <td className="text-sm w-max p-3">{job.level}</td>
          <td className="text-sm w-max p-3">{job.salary}</td>
          <td className="text-sm w-max p-3">
            <p>{job.location}</p>
          </td>
          <td className="text-sm w-max p-3">
            <div className="flex items-center gap-3">
              <Image src={job.companylogo} width={20} height={20} alt="img" />
              <p>{job.company}</p>
            </div>
          </td>
          <td className="text-sm w-max p-3">
            <p>
              {job.applied} / {job.capacity}
            </p>
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

export default SavedJobsTableBody;
