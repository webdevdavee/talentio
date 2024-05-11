"use client";

import { useSearchParams } from "next/navigation";
import CompanyCategory from "./CompanyCategory";
import RecommendedCompanies from "./RecommendedCompanies";
import SignUpBanner from "./SignUpBanner";
import { useEffect, useState } from "react";
import {
  getCompanies,
  handleCompanyFilter,
} from "@/database/actions/company.actions";
import { countPropertyValues } from "@/lib/utils";
import CompaniesFilterBar from "./CompaniesFilterBar";
import CompaniesFromFilter from "./CompaniesFromFilter";

type CompaniesProps = {
  companies: GetCompanies | undefined;
  categories: Category[];
  page: number;
  industryFrequency: PropertyValueFrequency[];
};

const Companies = ({
  companies,
  categories,
  page,
  industryFrequency,
}: CompaniesProps) => {
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

  // Function to fetch companies
  const fetchCompanies = async () => {
    setShowLoader(true);

    const companies: GetCompanies | undefined = await getCompanies(page);

    setCompaniesData({
      companies: companies?.companies,
      totalPages: companies?.totalPages,
    });
    setShowLoader(false);
  };

  // Function to fetch companies based on filters that have been applied
  const fetchFilteredCompanies = async () => {
    setShowLoader(true);

    const filteredCompanies: GetCompanies2 | undefined =
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
  };

  // If areFiltersEmpty is true run the fetchJobs() function, if not, run the fetchFilteredJobs(). This useEffect only runs when either of page, areFiltersEmpty or value changes
  const [value] = search;

  useEffect(() => {
    if (areFiltersEmpty) {
      fetchCompanies();
    } else {
      fetchFilteredCompanies();
    }
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
          <CompanyCategory categories={categories} />
        </div>
      )}
    </>
  );
};

export default Companies;
