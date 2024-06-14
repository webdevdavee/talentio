type MetricCardProps = {
  colour: string;
  data: any;
  label: string;
};

const MetricCard = ({ colour, data, label }: MetricCardProps) => {
  return (
    <section className={`w-full p-8 ${colour}`}>
      <div className="flex items-center gap-5">
        <p className="text-white text-5xl">{data}</p>
        <p className="text-white text-lg">{label}</p>
      </div>
    </section>
  );
};

export default MetricCard;
