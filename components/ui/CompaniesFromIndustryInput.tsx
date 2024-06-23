import { createURL } from "@/lib/utils";
import CompanyCard2 from "../cards/CompanyCard2";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type CompaniesFromIndustryInputProps = {
  companiesFromIndustry: Company[];
  selectedIndustry: string;
  companiesParams: URLSearchParams;
};

const CompaniesFromIndustryInput = ({
  companiesFromIndustry,
  selectedIndustry,
  companiesParams,
}: CompaniesFromIndustryInputProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const viewMoreCompaniesFromCurrentIndustry = (selectedIndustry: string) => {
    // Create a key that holds an array of industry name in the URL
    companiesParams.append("industry", selectedIndustry);
    // Save the checked state of the industry name to the URL
    companiesParams.set(selectedIndustry, "true");
    // Create a URL query
    const url = createURL(pathname, companiesParams);
    // Send the created query to the URL
    router.push(url);
  };

  return (
    <section className="mt-16">
      <h1 className="text-3xl font-bold mb-8">
        {companiesFromIndustry.length > 0 ? companiesFromIndustry.length : 0}{" "}
        {companiesFromIndustry.length !== 1 ? "Results" : "Result"}
      </h1>
      <div className="w-full grid grid-cols-4 gap-4 m:grid-cols-1">
        {companiesFromIndustry.length > 0 ? (
          companiesFromIndustry
            .slice(0, 8)
            .map((company) => (
              <CompanyCard2 key={company._id} company={company} />
            ))
        ) : (
          <p className="w-full text-2xl font-medium">No company found.</p>
        )}
      </div>
      <button
        type="button"
        className="w-full flex items-center mt-8"
        style={{ display: companiesFromIndustry.length > 0 ? "flex" : "none" }}
      >
        <p
          className="text-primary font-medium"
          onClick={() => viewMoreCompaniesFromCurrentIndustry(selectedIndustry)}
        >
          View more {selectedIndustry} companies
        </p>
        <Image src="/arrow-right.svg" width={20} height={20} alt="arrow" />
      </button>
    </section>
  );
};

export default CompaniesFromIndustryInput;
