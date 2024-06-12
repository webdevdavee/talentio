import Loader from "../Loader";
import ApplicationsTableBody from "./ApplicationsTableBody";
import ApplicationsTableHead from "./ApplicationsTableHead";

type ApplicationsTableBodyProps = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  checkedItems: CheckedItems;
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItems>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleApplicationToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isLoading: boolean;
};

const ApplicationsTable = ({
  jobs,
  setJobs,
  checkedItems,
  setCheckedItems,
  setShowDeleteModal,
  setSingleApplicationToBeDeleted,
  isLoading,
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

        jobs?.forEach((job: Job) => {
          newCheckedItems[job._id] = true;
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
              jobs={jobs}
              setJobs={setJobs}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {jobs && jobs.length > 0 && (
              <ApplicationsTableBody
                jobs={jobs}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleApplicationToBeDeleted={
                  setSingleApplicationToBeDeleted
                }
              />
            )}
          </table>
          {!jobs ? (
            <p className="w-full mt-10 text-center">You have no applied jobs</p>
          ) : (
            jobs &&
            jobs?.length <= 0 && (
              <p className="w-full mt-10 text-center">
                You have no applied jobs
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
