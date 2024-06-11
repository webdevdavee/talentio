import ApplicationsTableBody from "./ApplicationsTableBody";
import ApplicationsTableHead from "./ApplicationsTableHead";

type ApplicationsTableBodyProps = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const ApplicationsTable = ({ jobs, setJobs }: ApplicationsTableBodyProps) => {
  return (
    <section>
      <table className="w-full">
        <ApplicationsTableHead jobs={jobs} setJobs={setJobs} />
        {jobs && jobs.length > 0 && <ApplicationsTableBody jobs={jobs} />}
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

export default ApplicationsTable;
