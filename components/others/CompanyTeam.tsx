import TeamCard from "../cards/TeamCard";

const CompanyTeam = () => {
  return (
    <section className="pb-8 border-b border-b-gray-200">
      <h2 className="text-2xl font-semibold">Team</h2>
      <div className="w-full grid grid-cols-3 gap-3 mt-5 m:grid-cols-1">
        <TeamCard src="/images/team (1).webp" name="Tim Toddler" />
        <TeamCard src="/images/team (2).webp" name="Jake Funes" />
        <TeamCard src="/images/team (3).webp" name="Mark Umbro" />
      </div>
    </section>
  );
};

export default CompanyTeam;
