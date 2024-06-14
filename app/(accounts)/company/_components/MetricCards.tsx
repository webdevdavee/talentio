import MetricCard from "./MetricCard";

const MetricCards = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-5">
        <MetricCard
          colour="bg-[#219C90]"
          data={5}
          label="New candidates to review"
        />
        <MetricCard colour="bg-[#FF8F00]" data={57} label="Messages received" />
        <MetricCard colour="bg-[#5A72A0]" data={3} label="Profile visits" />
      </div>
    </section>
  );
};

export default MetricCards;
