import Loader from "../../../../components/ui/Loader";
import JobsTableHead from "./JobsTableHead";
import JobsTableBody from "./JobsTableBody";

type JobsTableBodyProps = {
  jobs: Job[] | undefined;
  setJobs: React.Dispatch<React.SetStateAction<Job[] | undefined>>;
  checkedItems: CheckedItems;
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItems>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleJobToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  isLoading: boolean;
};

const JobsTable = ({
  jobs,
  setJobs,
  checkedItems,
  setCheckedItems,
  setShowDeleteModal,
  setSingleJobToBeDeleted,
  isLoading,
}: JobsTableBodyProps) => {
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
            <JobsTableHead
              jobs={jobs}
              setJobs={setJobs}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {jobs && jobs.length > 0 && (
              <JobsTableBody
                jobs={jobs}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleJobToBeDeleted={setSingleJobToBeDeleted}
              />
            )}
          </table>
          {!jobs ? (
            <p className="w-full mt-10 text-center">No jobs to show</p>
          ) : (
            jobs &&
            jobs?.length <= 0 && (
              <p className="w-full mt-10 text-center">No jobs to show</p>
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

export default JobsTable;
