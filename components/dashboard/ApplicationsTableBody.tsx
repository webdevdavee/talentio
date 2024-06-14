import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ApplicationTableBodyProps = {
  jobs: Job[];
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicationToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  handleShowApplication: (jobId: string) => Promise<void>;
};

const ApplicationsTableBody = ({
  jobs,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleApplicationToBeDeleted,
  handleShowApplication,
}: ApplicationTableBodyProps) => {
  const openDeleteModal = (jobId: string) => {
    useOverlayStore.setState({ overlay: true });
    setShowDeleteModal(true);
    setSingleApplicationToBeDeleted(jobId);
  };

  return (
    <tbody className="border border-gray-300">
      {jobs.map((job) => (
        <tr key={job._id}>
          <td className="p-3">
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={job._id}
              checked={checkedItems[job._id] || false}
              onChange={handleCheckboxChange}
            />
          </td>
          <td className="text-sm w-max p-3">
            <div className="flex items-center gap-3">
              <Image src={job.companylogo} width={20} height={20} alt="img" />
              <p>{job.company}</p>
            </div>
          </td>
          <td className="text-sm w-max p-3">
            <Link href={`/job/${job._id}`} className="underline">
              {job.title}
            </Link>
          </td>
          <td className="text-sm w-max p-3">
            {convertDateFormat(job.applicationDate as Date)}
          </td>
          <td className="text-sm w-max p-3">{job.salary}</td>
          <td className="text-sm w-max p-3">
            <button
              type="button"
              className="bg-primary text-white p-2"
              onClick={() => handleShowApplication(job._id)}
            >
              See application
            </button>
          </td>
          <td className="text-sm w-max p-3">
            <button type="button" onClick={() => openDeleteModal(job._id)}>
              <Image src="/trash.svg" width={20} height={20} alt="delete" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ApplicationsTableBody;
