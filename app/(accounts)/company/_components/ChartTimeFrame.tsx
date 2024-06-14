const ChartTimeFrame = () => {
  return (
    <section className="bg-gray-100 p-2">
      <div className="flex items-center gap-3">
        <button type="button" className="bg-white text-primary p-2 font-medium">
          Week
        </button>
        <button type="button" className="text-primary p-2 font-medium">
          Year
        </button>
      </div>
    </section>
  );
};

export default ChartTimeFrame;
