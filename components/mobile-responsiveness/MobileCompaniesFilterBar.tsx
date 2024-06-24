import { useState } from "react";
import CompaniesFilterList from "../others/CompaniesFilterList";

type MobileCompaniesFilterBarProps = {
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

const MobileCompaniesFilterBar = ({
  setCompaniesData,
  industryFrequency,
  newPropertyValueCount,
  setShowLoader,
}: MobileCompaniesFilterBarProps) => {
  const [propertyValueFrequency, setPropertyValueFrequency] =
    useState<PropertyValueFrequencyData>({
      industryFrequency: industryFrequency,
    });

  return (
    <section className="w-[20%] m:w-full">
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

export default MobileCompaniesFilterBar;
