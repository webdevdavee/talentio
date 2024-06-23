import Loader from "../../../../components/ui/Loader";
import ApplicantsTableBody from "./ApplicantsTableBody";
import ApplicantsTableHead from "./ApplicantsTableHead";

type ApplicantsTableBodyProps = {
  applicants: UserApplication[];
  setApplicants: React.Dispatch<React.SetStateAction<UserApplication[]>>;
  checkedItems: CheckedItems;
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItems>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicantToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isLoading: boolean;
  handleShowApplication: (jobId: string) => Promise<void>;
  handleShowEditApplicant: (applicantId: string) => Promise<void>;
};

const ApplicantsTable = ({
  applicants,
  setApplicants,
  checkedItems,
  setCheckedItems,
  setShowDeleteModal,
  setSingleApplicantToBeDeleted,
  isLoading,
  handleShowApplication,
  handleShowEditApplicant,
}: ApplicantsTableBodyProps) => {
  // Function to handle individual checkbox toggle
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setCheckedItems((prevCheckedItems) => {
      // Create a copy of the current checked items
      const newCheckedItems: CheckedItems = { ...prevCheckedItems };

      if (checked) {
        // If the checkbox is checked, add it to the checked items
        newCheckedItems[value] = true;
      } else {
        // If the checkbox is unchecked, remove it from the checked items
        delete newCheckedItems[value];
      }

      return newCheckedItems;
    });
  };

  // Function to handle select all checkboxes
  const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setCheckedItems(() => {
      // If the "Select All" checkbox is checked, add all items to checkedItems
      if (isChecked) {
        const newCheckedItems: CheckedItems = {};

        applicants?.forEach((applicant: UserApplication) => {
          newCheckedItems[applicant._id] = true;
        });
        return newCheckedItems;
      } else {
        // If the "Select All" checkbox is unchecked, clear checkedItems
        return {};
      }
    });
  };

  return (
    <section>
      {!isLoading ? (
        <>
          <table className="w-full">
            <ApplicantsTableHead
              applicants={applicants}
              setApplicants={setApplicants}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {applicants && applicants.length > 0 && (
              <ApplicantsTableBody
                applicants={applicants}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleApplicantToBeDeleted={setSingleApplicantToBeDeleted}
                handleShowApplication={handleShowApplication}
                handleShowEditApplicant={handleShowEditApplicant}
              />
            )}
          </table>
          {!applicants ? (
            <p className="w-full mt-10 text-center">No applicants to show</p>
          ) : (
            applicants &&
            applicants?.length <= 0 && (
              <p className="w-full mt-10 text-center">No applicants to show</p>
            )
          )}
        </>
      ) : (
        <section className="h-[70%] flex items-center justify-center py-16">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default ApplicantsTable;
