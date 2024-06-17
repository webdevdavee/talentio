import MetricCard from "./MetricCard";

type MetricCardsProps = {
  pageViews: number;
};

const MetricCards = ({ pageViews }: MetricCardsProps) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-5">
        <MetricCard
          colour="bg-[#219C90]"
          data={5}
          label="New candidates to review"
        />
        <MetricCard colour="bg-[#FF8F00]" data={57} label="Messages received" />
        <MetricCard
          type="visits"
          colour="bg-[#5A72A0]"
          data={pageViews}
          label="Profile visits"
        />
      </div>
    </section>
  );
};

export default MetricCards;
