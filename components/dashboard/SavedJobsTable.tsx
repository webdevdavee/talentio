import Loader from "../Loader";
import SavedJobsTableBody from "./SavedJobsTableBody";
import SavedJobsTableHead from "./SavedJobsTableHead";

type SavedJobsTableBodyProps = {
  jobs: Job[];
};

const SavedJobsTable = ({ jobs }: SavedJobsTableBodyProps) => {
  return (
    <section>
      <table className="w-full">
        <SavedJobsTableHead />
        {jobs && jobs.length > 0 && <SavedJobsTableBody jobs={jobs} />}
      </table>
      {!jobs ? (
        <p className="w-full mt-10 text-center">You have no saved jobs</p>
      ) : (
        jobs &&
        jobs?.length <= 0 && (
          <p className="w-full mt-10 text-center">You have no saved jobs</p>
        )
      )}
    </section>
  );
};

export default SavedJobsTable;
