import { handleCompanyFilter } from "@/database/actions/company.actions";
import { countPropertyValues, createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import CompaniesFilter from "./CompaniesFilter";

type CompaniesFilterListProps = {
  propertyValueFrequency: PropertyValueFrequencyData;
  setCompaniesData: React.Dispatch<
    React.SetStateAction<{
      companies: Company[] | undefined;
      totalPages: number | undefined;
    }>
  >;
  setPropertyValueFrequency: React.Dispatch<
    React.SetStateAction<PropertyValueFrequencyData>
  >;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

type FilterVisibility = Record<string, boolean> & {
  industry: boolean;
};

const CompaniesFilterList = ({
  propertyValueFrequency,
  setCompaniesData,
  setPropertyValueFrequency,
  setShowLoader,
}: CompaniesFilterListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updatedParams = new URLSearchParams(searchParams.toString());

  const [filterVisibility, setFilterVisibility] = useState<FilterVisibility>({
    industry: true,
    category: true,
  });

  // Toggle the visibility of specific filters
  const toggleFilterVisibility = (filterName: keyof FilterVisibility) => {
    setFilterVisibility((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const updateFilters = async (updatedParams: URLSearchParams) => {
    // Create a URL query
    const url = createURL(pathname, updatedParams);
    // Send the created query to the URL
    router.push(url);

    setShowLoader(true);
    // Fetch the updated URL keys and values from the URL and save the data in the respective variables
    const [industry, search] = ["industry", "search"].map((key) =>
      updatedParams.getAll(key)
    );

    // Depending on which key data was fetched, send the data to the server action "handleCompanyFilter" to filter the database collection
    const filteredCompanies: GetCompanies | undefined =
      await handleCompanyFilter(industry, search);

    // Once result is returned, update the jobs array to the filteredCompanies data
    setCompaniesData({
      companies: filteredCompanies?.companies,
      totalPages: filteredCompanies?.totalPages,
    });

    // Get the property value count or frequency based on the companies array and element property passed
    function createFrequencyObject(
      companies: Company[] | undefined
    ): PropertyValueFrequencyData {
      return {
        industryFrequency: countPropertyValues(companies, "industry"),
      };
    }

    const newFrequency = createFrequencyObject(filteredCompanies?.companies);
    const newFrequencyNoLimit = createFrequencyObject(
      filteredCompanies?.companiesNoLimit
    );

    // Determine if all filters are empty
    const areFiltersEmpty = [industry, search].every(
      (filter) => filter.length <= 0
    );

    // Set the appropriate propertyFrequency based on whether filters are empty
    setPropertyValueFrequency(
      areFiltersEmpty ? newFrequencyNoLimit : newFrequency
    );
    setShowLoader(false);
  };

  // Function to set the URL params keys and values
  const handleFilterChange = async (
    e: ChangeEvent<HTMLInputElement>,
    filterType: string,
    filterValue: string
  ) => {
    // Extract the checked and name variables from the e.target object
    const { checked, name } = e.target;

    if (checked) {
      // Create a key that holds an array of filterValues in the URL
      updatedParams.append(filterType, filterValue);
      // Save the checked state of the filterValue to the URL
      updatedParams.set(name, checked.toString());
    } else {
      // If checked is false, delete URL keys
      updatedParams.delete(filterType, filterValue);
      updatedParams.delete(name);
    }

    // Take user to first page
    const pageToFirst = 1;
    updatedParams.set("page", pageToFirst.toString());

    // Call the updateFilters function and pass the updated URL keys and values
    await updateFilters(updatedParams);
  };

  // Filters' data and actions
  const filtersConfig = [
    {
      title: "Industry",
      type: "industry",
      frequency: propertyValueFrequency.industryFrequency,
      toggleShowFilter: () => toggleFilterVisibility("industry"),
      showFilter: filterVisibility.industry,
    },
  ];

  return (
    <section className="w-full">
      <div className="flex flex-col gap-10">
        {filtersConfig.map((filter, index) => (
          <CompaniesFilter
            key={index}
            filter={filter}
            handleFilter={handleFilterChange}
            updatedParams={updatedParams}
          />
        ))}
      </div>
    </section>
  );
};

export default CompaniesFilterList;
