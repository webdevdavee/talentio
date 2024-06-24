type JobOpenProps = {
  companyJobCount: number;
};

const JobOpen = ({ companyJobCount }: JobOpenProps) => {
  return (
    <section className="border border-gray-200 p-4">
      <div className="flex flex-col gap-3">
        <h2 className="font-medium">Jobs open</h2>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-medium m:text-6xl">{companyJobCount}</p>
          <p className="text-gray-600">job(s) opened</p>
        </div>
      </div>
    </section>
  );
};

export default JobOpen;
