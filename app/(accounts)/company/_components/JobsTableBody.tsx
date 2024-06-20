import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat } from "@/lib/utils";
import Image from "next/image";

type ApplicationTableBodyProps = {
  jobs: Job[];
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleJobToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const JobsTableBody = ({
  jobs,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleJobToBeDeleted,
}: ApplicationTableBodyProps) => {
  const openDeleteModal = (jobId: string) => {
    useOverlayStore.setState({ overlay: true });
    setShowDeleteModal(true);
    setSingleJobToBeDeleted(jobId);
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
            <p>{job.title}</p>
          </td>
          <td className="text-sm w-max p-3">
            <p>{job.type}</p>
          </td>
          <td className="text-sm w-max p-3">
            <p>{job.level}</p>
          </td>
          <td className="text-sm w-max p-3">
            {convertDateFormat(job.createdAt as Date)}
          </td>
          <td className="text-sm w-max p-3">{job.salary}</td>
          <td className="text-sm w-max p-3">{job.capacity}</td>
          <td className="text-sm w-max p-3">{job.applied}</td>
          <td className="text-sm w-max p-3">
            <div className="flex items-center gap-5">
              <button type="button">
                <Image src="/edit.svg" width={20} height={20} alt="edit" />
              </button>
              <button type="button" onClick={() => openDeleteModal(job._id)}>
                <Image src="/trash.svg" width={20} height={20} alt="delete" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default JobsTableBody;
