"use client";

import { useSearchParams } from "next/navigation";
import CompanyIndustry from "./CompanyIndustry";
import RecommendedCompanies from "./RecommendedCompanies";
import SignUpBanner from "./SignUpBanner";
import { useEffect, useState } from "react";
import { handleCompanyFilter } from "@/database/actions/company.actions";
import { countPropertyValues, handleError } from "@/lib/utils";
import CompaniesFilterBar from "./CompaniesFilterBar";
import CompaniesFromFilter from "./CompaniesFromFilter";

type CompaniesProps = {
  companies: GetCompanies | undefined;
  page: number;
  industryFrequency: PropertyValueFrequency[];
};

const Companies = ({ companies, page, industryFrequency }: CompaniesProps) => {
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

  return (
    <>
      {industry.length > 0 || search.length > 0 ? (
        <div className="w-full flex items-start justify-start gap-8 p-16">
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
          <div className="px-16">
            <SignUpBanner />
          </div>
          <CompanyIndustry companiesParams={companiesParams} />
        </div>
      )}
    </>
  );
};

export default Companies;
