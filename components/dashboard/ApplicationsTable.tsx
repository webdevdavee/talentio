import ApplicationsTableBody from "./ApplicationsTableBody";
import ApplicationsTableHead from "./ApplicationsTableHead";

const ApplicationsTable = () => {
  return (
    <section>
      <table className="w-full">
        <ApplicationsTableHead />
        <ApplicationsTableBody />
      </table>
    </section>
  );
};

export default ApplicationsTable;
