"use client";

import { useSearchParams } from "next/navigation";
import CompanyIndustry from "./CompanyIndustry";
import RecommendedCompanies from "./RecommendedCompanies";
import SignUpBanner from "../ui/SignUpBanner";
import { useEffect, useState } from "react";
import { handleCompanyFilter } from "@/database/actions/company.actions";
import { countPropertyValues, handleError } from "@/lib/utils";
import CompaniesFilterBar from "./CompaniesFilterBar";
import CompaniesFromFilter from "./CompaniesFromFilter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import MobileCompaniesFilterBar from "@/components/mobile-responsiveness/MobileCompaniesFilterBar";

type CompaniesProps = {
  companies: GetCompanies | undefined;
  page: number;
  industryFrequency: PropertyValueFrequency[];
};

const Companies = ({ companies, page, industryFrequency }: CompaniesProps) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const companiesParams = new URLSearchParams(searchParams.toString());

  const [companiesData, setCompaniesData] = useState({
    companies: companies?.companies,
    totalPages: companies?.totalPages,
  });

  const [newPropertyValueCount, setNewPropertyValueCount] =
    useState<PropertyValueFrequencyData>();

  const [showLoader, setShowLoader] = useState(false);

  const [industry, search] = ["industry", "search"].map((key) =>
    companiesParams.getAll(key)
  );

  // Determine if all filters are empty
  const areFiltersEmpty = [industry, search].every(
    (filter) => filter.length <= 0
  );

  // Function to fetch companies based on if filters are applied or not
  const fetchCompanies = async () => {
    try {
      setShowLoader(true);

      // Function to fetch companies from filters and if no filters fetch companies regardless of filter
      const filteredCompanies: GetCompanies | undefined =
        await handleCompanyFilter(industry, search, page);

      setCompaniesData({
        companies: filteredCompanies?.companies,
        totalPages: filteredCompanies?.totalPages,
      });

      // Get the property value count or frequency based on the type of job array passed
      const createFrequencyObject = (
        companies: Company[] | undefined
      ): PropertyValueFrequencyData => {
        return {
          industryFrequency: countPropertyValues(companies, "industry"),
        };
      };

      const newFrequency = createFrequencyObject(filteredCompanies?.companies);
      const newFrequencyNoLimit = createFrequencyObject(
        filteredCompanies?.companiesNoLimit
      );

      // Set the appropriate jobsFrequency based on whether filters are empty
      setNewPropertyValueCount(
        areFiltersEmpty ? newFrequencyNoLimit : newFrequency
      );
      setShowLoader(false);
    } catch (error) {
      handleError(error);
    }
  };

  // When either of page, areFiltersEmpty or value changes, run fetchCompanies() function
  const [value] = search;

  useEffect(() => {
    fetchCompanies();
  }, [page, areFiltersEmpty, value]);

  const [showMobileFilterBar, setShowMobileFilterBar] = useState(false);

  return (
    <>
      {industry.length > 0 || search.length > 0 ? (
        <div className="w-full flex items-start justify-start gap-8 p-16 m:flex-col m:px-4 m:py-6">
          <button
            className="w-full p-3 border flex items-center justify-center gap-2 drop-shadow-xl"
            onClick={() => setShowMobileFilterBar((prev) => !prev)}
          >
            <Image src="filter.svg" width={18} height={18} alt="filters" />
            <p>Filters</p>
          </button>
          {/* Companies filter bar for mobile */}
          {showMobileFilterBar && (
            <MobileCompaniesFilterBar
              setCompaniesData={setCompaniesData}
              industryFrequency={industryFrequency}
              newPropertyValueCount={newPropertyValueCount}
              setShowLoader={setShowLoader}
            />
          )}
          {/* // Companies filter bar for desktop */}
          <CompaniesFilterBar
            setCompaniesData={setCompaniesData}
            industryFrequency={industryFrequency}
            newPropertyValueCount={newPropertyValueCount}
            setShowLoader={setShowLoader}
          />
          <CompaniesFromFilter
            companies={companiesData.companies}
            totalPages={companiesData.totalPages}
            page={page}
            showLoader={showLoader}
          />
        </div>
      ) : (
        <div>
          <RecommendedCompanies companies={companies?.companies} />
          {!session && (
            <div className="px-16 m:px-4">
              <SignUpBanner />
            </div>
          )}
          <CompanyIndustry companiesParams={companiesParams} />
        </div>
      )}
    </>
  );
};

export default Companies;
