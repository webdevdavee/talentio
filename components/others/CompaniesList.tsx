import CompanyCard from "../cards/CompanyCard";
import IndustryCard from "../cards/IndustryCard";

type CompaniesListProps = {
  type: string;
  companies?: Company[] | undefined;
  industries?: Industry[] | undefined;
  sliceStart?: number;
  sliceEnd?: number;
  fetchCompanies?: (industry: string) => Promise<void>;
  layout?: "row" | "column";
};

const CompaniesList = ({
  type,
  companies,
  industries,
  sliceStart,
  sliceEnd,
  fetchCompanies,
  layout,
}: CompaniesListProps) => {
  return (
    <>
      {companies && companies.length > 0 && type === "recommended" && (
        <section className="w-full grid grid-cols-4 gap-6 m:grid-cols-1 xl:grid-cols-2">
          {companies.slice(0, 8).map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              type="recommended"
            />
          ))}
        </section>
      )}
      {fetchCompanies &&
        industries &&
        industries.length > 0 &&
        type === "from_industry" && (
          <div className="w-full grid grid-cols-4 items-center gap-6 mt-16 m:flex m:gap-4 m:overflow-x-scroll m:overflow-y-hidden m:mt-6 xl:grid-cols-2">
            {industries.slice(sliceStart, sliceEnd).map((industry, index) => (
              <IndustryCard
                key={index}
                industry={industry}
                fetchCompanies={fetchCompanies}
              />
            ))}
          </div>
        )}
      {companies && companies.length > 0 && type === "search" && (
        <section
          className={`${
            layout === "row"
              ? "w-full flex flex-col gap-6"
              : "w-full grid grid-cols-2 gap-6"
          }`}
        >
          {companies.slice(0, 8).map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              layout={layout}
              type="search"
            />
          ))}
        </section>
      )}
    </>
  );
};

export default CompaniesList;
