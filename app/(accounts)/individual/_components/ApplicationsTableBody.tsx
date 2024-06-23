import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ApplicationTableBodyProps = {
  applications: UserApplication[];
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicationToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  handleShowApplication: (applicationId: string) => Promise<void>;
};

const ApplicationsTableBody = ({
  applications,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleApplicationToBeDeleted,
  handleShowApplication,
}: ApplicationTableBodyProps) => {
  const openDeleteModal = (applicationId: string) => {
    useOverlayStore.setState({ overlay: true });
    setShowDeleteModal(true);
    setSingleApplicationToBeDeleted(applicationId);
  };

  return (
    <tbody className="border border-gray-300">
      {applications.map((application) => (
        <tr key={application._id}>
          <td className="p-3">
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={application._id}
              checked={checkedItems[application._id] || false}
              onChange={handleCheckboxChange}
            />
          </td>
          <td className="text-sm w-max p-3">
            <div className="flex items-center gap-3">
              <Image
                src={application.job.companylogo}
                width={20}
                height={20}
                alt="img"
              />
              <p>{application.job.company}</p>
            </div>
          </td>
          <td className="text-sm p-3">
            <Link href={`/job/${application.jobId}`} className="underline">
              <p className="w-max">{application.job.title}</p>
            </Link>
          </td>
          <td className="text-sm p-3">
            <p className="w-max">
              {convertDateFormat(application.createdAt as Date)}
            </p>
          </td>
          <td className="text-sm p-3">
            <p className="w-max">{application.job.salary}</p>
          </td>
          <td className="text-sm p-3">
            <button
              type="button"
              className="bg-primary text-white p-2 w-max"
              onClick={() => handleShowApplication(application._id)}
            >
              See application
            </button>
          </td>
          <td className="text-sm p-3">
            <button
              type="button"
              onClick={() => openDeleteModal(application._id)}
              className="w-max"
            >
              <Image src="/trash.svg" width={20} height={20} alt="delete" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ApplicationsTableBody;
