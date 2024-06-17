import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ApplicationTableBodyProps = {
  applicants: UserApplication[];
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicationToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  handleShowApplication: (applicantId: string) => Promise<void>;
};

const ApplicantsTableBody = ({
  applicants,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleApplicationToBeDeleted,
  handleShowApplication,
}: ApplicationTableBodyProps) => {
  const openDeleteModal = (applicantId: string) => {
    useOverlayStore.setState({ overlay: true });
    setShowDeleteModal(true);
    setSingleApplicationToBeDeleted(applicantId);
  };

  return (
    <tbody className="border border-gray-300">
      {applicants.map((applicant) => (
        <tr key={applicant._id}>
          <td className="p-3">
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={applicant._id}
              checked={checkedItems[applicant._id] || false}
              onChange={handleCheckboxChange}
            />
          </td>
          <td className="text-sm w-max p-3">
            <p>John Towel</p>
          </td>
          <td className="text-sm w-max p-3">4.6</td>
          <td className="text-sm w-max p-3">16th June 2024</td>
          <td className="text-sm w-max p-3">Cyber security</td>
          <td className="text-sm w-max p-3">
            <p>Interview</p>
          </td>
          <td className="text-sm w-max p-3">
            <button
              type="button"
              className="bg-primary text-white p-2"
              onClick={() => handleShowApplication(applicant._id)}
            >
              See application
            </button>
          </td>
          <td className="text-sm w-max p-3">
            <button
              type="button"
              onClick={() => openDeleteModal(applicant._id)}
            >
              <Image src="/trash.svg" width={20} height={20} alt="delete" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ApplicantsTableBody;
