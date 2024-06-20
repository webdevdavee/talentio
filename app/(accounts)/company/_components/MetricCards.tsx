import MetricCard from "./MetricCard";
import { formatNumberWithCommas } from "@/lib/utils";

type MetricCardsProps = {
  pageViews: number;
  newCandidatesCount: number | undefined;
};

const MetricCards = ({ pageViews, newCandidatesCount }: MetricCardsProps) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-5">
        <MetricCard
          colour="bg-[#219C90]"
          data={
            newCandidatesCount &&
            formatNumberWithCommas(newCandidatesCount.toString())
          }
          label="New candidates to review"
        />
        <MetricCard colour="bg-[#FF8F00]" data={57} label="Messages received" />
        <MetricCard
          type="visits"
          colour="bg-[#5A72A0]"
          data={pageViews ? formatNumberWithCommas(pageViews.toString()) : "0"}
          label="Profile visits"
        />
      </div>
    </section>
  );
};

export default MetricCards;
