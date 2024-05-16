import { createURL } from "@/lib/utils";
import CompanyCard2 from "./CompanyCard2";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type CompaniesFromCategoryInputProps = {
  companiesFromCategory: Company[];
  selectedCategory: string;
  companiesParams: URLSearchParams;
};

const CompaniesFromCategoryInput = ({
  companiesFromCategory,
  selectedCategory,
  companiesParams,
}: CompaniesFromCategoryInputProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const viewMoreCompaniesFromCurrentCateggory = (selectedCategory: string) => {
    companiesParams.append("category", selectedCategory);
    // Create a URL query
    const url = createURL(pathname, companiesParams);
    // Send the created query to the URL
    router.push(url);
  };

  return (
    <section className="mt-16">
      <h1 className="text-3xl font-bold mb-8">
        {companiesFromCategory.length > 0 ? companiesFromCategory.length : 0}{" "}
        {companiesFromCategory.length !== 1 ? "Results" : "Result"}
      </h1>
      <div className="w-full grid grid-cols-4 gap-4">
        {companiesFromCategory.length > 0 ? (
          companiesFromCategory
            .slice(0, 8)
            .map((company) => (
              <CompanyCard2 key={company._id} company={company} />
            ))
        ) : (
          <p className="w-full text-2xl font-medium">No company found.</p>
        )}
      </div>
      <Link
        href="#"
        className="w-full flex items-center mt-8"
        style={{ display: companiesFromCategory.length > 0 ? "flex" : "none" }}
      >
        <p
          className="text-primary font-medium"
          onClick={() =>
            viewMoreCompaniesFromCurrentCateggory(selectedCategory)
          }
        >
          View more {selectedCategory} companies
        </p>
        <Image src="/arrow-right.svg" width={20} height={20} alt="arrow" />
      </Link>
    </section>
  );
};

export default CompaniesFromCategoryInput;
