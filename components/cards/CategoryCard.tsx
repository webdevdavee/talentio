"use client";

import { createURL } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type CategoryCardProps = {
  category: Category;
  modifiedCategoryCount: CategoryCounts;
};

const CategoryCard = ({
  category,
  modifiedCategoryCount,
}: CategoryCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams.toString());

  const viewJobsByCategory = (string: string) => {
    urlParams.append("category", string);
    urlParams.set(string, "true");
    // Create a URL query
    const url = createURL("/jobs", urlParams);
    // Send the created query to the URL
    router.push(url);
  };

  return (
    <div
      className="border border-zinc-300 p-8 hover:scale-105 duration-200 transition cursor-pointer m:p-3"
      onClick={() => viewJobsByCategory(category.category)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          viewJobsByCategory(category.category);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col items-start justify-center gap-3 m:flex-row m:items-center m:justify-start">
        <Image
          src={category.icon}
          width={30}
          height={30}
          alt={category.category}
        />
        <div className="flex flex-col gap-3 m:gap-1">
          <p className="text-lg font-bold">{category.category}</p>
          <span className="flex items-center gap-1">
            <p className="text-gray-500">
              {modifiedCategoryCount[category.category] ?? 0} job(s) available
            </p>
            <Image
              src="/arrow-right.svg"
              width={20}
              height={20}
              alt={category.category}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
