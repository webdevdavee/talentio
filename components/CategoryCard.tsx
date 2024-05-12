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
      className="border border-zinc-300 p-8 hover:scale-105 duration-200 transition cursor-pointer"
      onClick={() => viewJobsByCategory(category.category)}
    >
      <div className="flex flex-col items-start justify-center gap-3">
        <Image
          src={category.icon}
          width={30}
          height={30}
          alt={category.category}
        />
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
  );
};

export default CategoryCard;
