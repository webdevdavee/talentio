import CompanyCard from "./CompanyCard";

type CompaniesList = {
  type: string;
  companies: Company[];
};

const CompaniesList = ({ type, companies }: CompaniesList) => {
  return (
    <>
      {companies && companies.length > 0 && type === "recommended" && (
        <section className="w-full grid grid-cols-4 gap-6">
          {companies.slice(0, 8).map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </section>
      )}
    </>
  );
};

export default CompaniesList;
