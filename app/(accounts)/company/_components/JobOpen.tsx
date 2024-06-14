const JobOpen = () => {
  return (
    <section className="border border-gray-200 p-4">
      <div className="flex flex-col gap-3">
        <h2 className="font-medium">Job open</h2>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-medium">21</p>
          <p className="text-gray-600">jobs opened</p>
        </div>
      </div>
    </section>
  );
};

export default JobOpen;
