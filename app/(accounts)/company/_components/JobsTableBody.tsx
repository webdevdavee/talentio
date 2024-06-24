import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat, createURL } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const jobParam = new URLSearchParams(searchParams.toString());

  const handleJobToEdit = (jobId: string) => {
    jobParam.set("job", jobId.toString());
    const url = createURL("/company/dashboard/edit-job", jobParam);
    router.push(url);
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
          <td>
            <p className="text-sm w-max p-3">{job.title}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.type}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.level}</p>
          </td>
          <td className="text-sm w-max p-3">
            <p className="text-sm w-max p-3">
              {convertDateFormat(job.createdAt as Date)}
            </p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.salary}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.capacity}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.applied}</p>
          </td>
          <td className="text-sm w-max p-3">
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="w-max"
                onClick={() => handleJobToEdit(job._id)}
              >
                <Image src="/edit.svg" width={20} height={20} alt="edit" />
              </button>
              <button
                type="button"
                className="w-max"
                onClick={() => openDeleteModal(job._id)}
              >
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
