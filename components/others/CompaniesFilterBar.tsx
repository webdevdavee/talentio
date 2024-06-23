import { useState } from "react";
import CompaniesFilterList from "./CompaniesFilterList";

type CompaniesFilterBarProps = {
  setCompaniesData: React.Dispatch<
    React.SetStateAction<{
      companies: Company[] | undefined;
      totalPages: number | undefined;
    }>
  >;
  industryFrequency: PropertyValueFrequency[];
  newPropertyValueCount: PropertyValueFrequencyData | undefined;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompaniesFilterBar = ({
  setCompaniesData,
  industryFrequency,
  newPropertyValueCount,
  setShowLoader,
}: CompaniesFilterBarProps) => {
  const [propertyValueFrequency, setPropertyValueFrequency] =
    useState<PropertyValueFrequencyData>({
      industryFrequency: industryFrequency,
    });

  return (
    <section className="w-[20%] m:hidden">
      <CompaniesFilterList
        propertyValueFrequency={
          newPropertyValueCount ? newPropertyValueCount : propertyValueFrequency
        }
        setCompaniesData={setCompaniesData}
        setPropertyValueFrequency={setPropertyValueFrequency}
        setShowLoader={setShowLoader}
      />
    </section>
  );
};

export default CompaniesFilterBar;
