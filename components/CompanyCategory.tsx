import { useEffect, useState } from "react";
import CompaniesFromCategoryInput from "./CompaniesFromCategoryInput";
import { getCompaniesByCategory } from "@/database/actions/company.actions";
import Loader from "./Loader";
import CompaniesList from "./CompaniesList";

type CompanyCategoryProps = {
  categories: Category[];
  companiesParams: URLSearchParams;
};

const CompanyCategory = ({
  categories,
  companiesParams,
}: CompanyCategoryProps) => {
  const [showLoader, setShowLoader] = useState(false);

  // Array to hold the companies gotten from the specific or selected category
  const [companiesFromCategory, setCompaniesFromCategory] = useState<Company[]>(
    []
  );

  // Selected category to fetch companies from
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].category
  );

  // Function to fetch companies
  const fetchCompanies = async (category: string) => {
    setShowLoader(true);
    const fetchedCompanies = await getCompaniesByCategory(category);
    setCompaniesFromCategory(fetchedCompanies);
    setShowLoader(false);
    setSelectedCategory(category);
  };

  // Fetch companies on initial page load
  useEffect(() => {
    fetchCompanies(selectedCategory);
  }, []);

  // Define the category array slice values
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);
  const sliceSize = 4;

  // Move to the next set of categories
  const nextCategories = () => {
    if (sliceEnd < categories.length) {
      const newEnd = Math.min(sliceEnd + sliceSize, categories.length);
      setSliceStart(sliceEnd);
      setSliceEnd(newEnd);
    }
  };

  // Move to the previous set of categories
  const prevCategories = async () => {
    if (sliceStart >= sliceSize) {
      setSliceStart(sliceStart - sliceSize);
      setSliceEnd(Math.min(sliceStart, categories.length));
    }
  };

  return (
    <section className="w-full px-16 mt-8 py-8 bg-slate-50">
      <h1 className="text-3xl font-bold">Companies by Category</h1>
      <CompaniesList
        type="from_category"
        categories={categories}
        sliceStart={sliceStart}
        sliceEnd={sliceEnd}
        fetchCompanies={fetchCompanies}
      />
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          type="button"
          className="px-3 py-2 bg-primary text-white"
          onClick={prevCategories}
        >
          Prev
        </button>
        <button
          type="button"
          className="px-3 py-2 bg-primary text-white"
          onClick={nextCategories}
        >
          Next
        </button>
      </div>
      {showLoader ? (
        <div className="flex items-center justify-center mt-16">
          <Loader className="loader" />
        </div>
      ) : (
        <CompaniesFromCategoryInput
          companiesFromCategory={companiesFromCategory}
          selectedCategory={selectedCategory}
          companiesParams={companiesParams}
        />
      )}
    </section>
  );
};

export default CompanyCategory;
