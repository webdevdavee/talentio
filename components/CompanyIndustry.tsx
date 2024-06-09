import { useEffect, useState } from "react";
import CompaniesFromIndustryInput from "./CompaniesFromIndustryInput";
import { getCompaniesByIndustry } from "@/database/actions/company.actions";
import Loader from "./Loader";
import CompaniesList from "./CompaniesList";
import { industries } from "@/constants";

type CompanyIndustryProps = {
  pageType?: string;
  companiesParams: URLSearchParams;
};

const CompanyIndustry = ({
  pageType,
  companiesParams,
}: CompanyIndustryProps) => {
  const [showLoader, setShowLoader] = useState(false);

  // Array to hold the companies gotten from the specific or selected industry
  const [companiesFromIndustry, setCompaniesFromIndustry] = useState<Company[]>(
    []
  );

  // Selected industry to fetch companies from
  const [selectedIndustry, setSelectedIndustry] = useState(
    industries[0].industry
  );

  // Function to fetch companies
  const fetchCompanies = async (industry: string) => {
    setShowLoader(true);
    const fetchedCompanies = await getCompaniesByIndustry(industry);
    setCompaniesFromIndustry(fetchedCompanies);
    setSelectedIndustry(industry);
    setShowLoader(false);
  };

  // Fetch companies on initial page load
  useEffect(() => {
    fetchCompanies(selectedIndustry);
  }, [selectedIndustry]);

  // Define the category array slice values
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);
  const sliceSize = 4;

  // Move to the next set of industries
  const nextIndustries = () => {
    if (sliceEnd < industries.length) {
      const newEnd = Math.min(sliceEnd + sliceSize, industries.length);
      setSliceStart(sliceEnd);
      setSliceEnd(newEnd);
    }
  };

  // Move to the previous set of industries
  const prevIndustries = async () => {
    if (sliceStart >= sliceSize) {
      setSliceStart(sliceStart - sliceSize);
      setSliceEnd(Math.min(sliceStart, industries.length));
    }
  };

  return (
    <section
      className={`w-full px-16 mt-8 py-8 bg-slate-50 ${pageType && "px-8"}`}
    >
      <h1 className="text-3xl font-bold">Companies by Industry</h1>
      <CompaniesList
        type="from_industry"
        industries={industries}
        sliceStart={sliceStart}
        sliceEnd={sliceEnd}
        fetchCompanies={fetchCompanies}
      />
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          type="button"
          className="px-3 py-2 bg-primary text-white"
          onClick={prevIndustries}
        >
          Prev
        </button>
        <button
          type="button"
          className="px-3 py-2 bg-primary text-white"
          onClick={nextIndustries}
        >
          Next
        </button>
      </div>
      {showLoader ? (
        <div className="flex items-center justify-center mt-16">
          <Loader className="loader" />
        </div>
      ) : (
        <CompaniesFromIndustryInput
          companiesFromIndustry={companiesFromIndustry}
          selectedIndustry={selectedIndustry}
          companiesParams={companiesParams}
        />
      )}
    </section>
  );
};

export default CompanyIndustry;
