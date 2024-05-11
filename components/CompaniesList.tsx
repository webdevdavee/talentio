import CategoryCard2 from "./CategoryCard2";
import CompanyCard from "./CompanyCard";

type CompaniesList = {
  type: string;
  companies?: Company[] | undefined;
  categories?: Category[] | undefined;
  sliceStart?: number;
  sliceEnd?: number;
  fetchCompanies?: (category: string) => Promise<void>;
  layout?: "row" | "column";
};

const CompaniesList = ({
  type,
  companies,
  categories,
  sliceStart,
  sliceEnd,
  fetchCompanies,
  layout,
}: CompaniesList) => {
  return (
    <>
      {companies && companies.length > 0 && type === "recommended" && (
        <section className="w-full grid grid-cols-4 gap-6">
          {companies.slice(0, 8).map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </section>
      )}
      {fetchCompanies &&
        categories &&
        categories.length > 0 &&
        type === "from_category" && (
          <div className="w-full grid grid-cols-4 items-center gap-6 mt-16">
            {categories.slice(sliceStart, sliceEnd).map((category) => (
              <CategoryCard2
                key={category._id}
                category={category}
                fetchCompanies={fetchCompanies}
              />
            ))}
          </div>
        )}
    </>
  );
};

export default CompaniesList;
