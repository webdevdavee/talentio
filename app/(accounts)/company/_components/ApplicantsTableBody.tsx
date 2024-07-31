import { useOverlayStore } from "@/lib/store/OverlayStore";
import { convertDateFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ApplicationTableBodyProps = {
  applicants: UserApplication[];
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicantToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  handleShowApplication: (applicantId: string) => Promise<void>;
  handleShowEditApplicant: (applicantId: string) => Promise<void>;
};

const ApplicantsTableBody = ({
  applicants,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleApplicantToBeDeleted,
  handleShowApplication,
  handleShowEditApplicant,
}: ApplicationTableBodyProps) => {
  const openDeleteModal = (applicantId: string) => {
    useOverlayStore.setState({ overlay: true });
    setShowDeleteModal(true);
    setSingleApplicantToBeDeleted(applicantId);
  };

  const getApplicantStageClasses = (stage: string) => {
    const baseClasses =
      "flex items-center justify-center gap-1 border rounded-2xl text-center p-2 capitalize font-medium";

    switch (stage) {
      case "in review":
        return `${baseClasses} border-[#FEBC43] text-[#FEBC43]`;
      case "shortlisted":
        return `${baseClasses} border-[#6C67E5] text-[#6C67E5]`;
      case "interviewed":
        return `${baseClasses} border-[#3BACFF] text-[#3BACFF]`;
      case "hired":
        return `${baseClasses} border-green-500 text-green-500`;
      default:
        return `${baseClasses} border-[#FF6550] text-[#FF6550]`;
    }
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
          <td>
            <p className="text-sm w-max p-3">
              {applicant.firstname} {applicant.lastname}
            </p>
          </td>
          <td className="text-sm w-max p-3 overflow-hidden">
            <Link
              href={`mailto:${applicant.email}`}
              className="flex items-center gap-1 underline text-purple-500 w-max"
            >
              <Image src="/link.svg" width={20} height={20} alt="link" />
              {applicant.email}
            </Link>
          </td>
          <td className="text-sm w-max p-3">
            <div className="flex items-center gap-3">
              {applicant.score > 0 ? (
                <Image src="/star-fill.svg" width={20} height={20} alt="img" />
              ) : (
                <Image src="/star.svg" width={20} height={20} alt="img" />
              )}
              <p>{applicant.score}%</p>
            </div>
          </td>
          <td>
            <p className="text-sm w-max p-3">
              {convertDateFormat(applicant.createdAt)}
            </p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{applicant.job.title}</p>
          </td>
          <td className="text-sm w-max p-3">
            <p className={getApplicantStageClasses(applicant.stage)}>
              {applicant.stage}
            </p>
          </td>
          <td className="text-sm w-max p-3">
            <button
              type="button"
              className="bg-primary text-white p-2 w-max"
              onClick={() => handleShowApplication(applicant._id)}
            >
              See application
            </button>
          </td>
          <td className="text-sm p-3">
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => handleShowEditApplicant(applicant._id)}
                className="w-max"
              >
                <Image src="/edit.svg" width={20} height={20} alt="edit" />
              </button>
              <button
                type="button"
                onClick={() => openDeleteModal(applicant._id)}
                className="w-max"
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

export default ApplicantsTableBody;
