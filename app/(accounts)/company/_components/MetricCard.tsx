type MetricCardProps = {
  type?: string;
  colour: string;
  data: any;
  label: string;
};

const MetricCard = ({ type, colour, data, label }: MetricCardProps) => {
  return (
    <section className={`w-full p-8 ${colour}`}>
      <div className="flex items-center gap-5">
        <p className="text-white text-5xl">{data}</p>
        <div className="flex flex-col">
          <p className="text-white text-lg">{label}</p>
          <span className="text-sm text-white">{type && "(Last 7 days)"}</span>
        </div>
      </div>
    </section>
  );
};

export default MetricCard;
