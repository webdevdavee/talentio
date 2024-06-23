import Loader from "../../../../components/ui/Loader";
import ApplicationsTableBody from "./ApplicationsTableBody";
import ApplicationsTableHead from "./ApplicationsTableHead";

type ApplicationsTableBodyProps = {
  applications: UserApplication[];
  setApplications: React.Dispatch<React.SetStateAction<UserApplication[]>>;
  checkedItems: CheckedItems;
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItems>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicationToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isLoading: boolean;
  handleShowApplication: (applicationId: string) => Promise<void>;
};

const ApplicationsTable = ({
  applications,
  setApplications,
  checkedItems,
  setCheckedItems,
  setShowDeleteModal,
  setSingleApplicationToBeDeleted,
  isLoading,
  handleShowApplication,
}: ApplicationsTableBodyProps) => {
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

        applications?.forEach((application: UserApplication) => {
          newCheckedItems[application._id] = true;
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
            <ApplicationsTableHead
              applications={applications}
              setApplications={setApplications}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {applications && applications.length > 0 && (
              <ApplicationsTableBody
                applications={applications}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleApplicationToBeDeleted={
                  setSingleApplicationToBeDeleted
                }
                handleShowApplication={handleShowApplication}
              />
            )}
          </table>
          {!applications ? (
            <p className="w-full mt-10 text-center">You have no applications</p>
          ) : (
            applications &&
            applications?.length <= 0 && (
              <p className="w-full mt-10 text-center">
                You have no applications
              </p>
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

export default ApplicationsTable;
