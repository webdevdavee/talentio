import { getJobsCategoryCount } from "@/database/actions/job.actions";
import Image from "next/image";

type CategoryProps = {
  category: Category;
};

const Category = async ({ category }: CategoryProps) => {
  // Fetch the number of times a category appeared in a listed job
  const categoryCount: CategoryCount[] | undefined =
    await getJobsCategoryCount();

  // Modified categoryCount object
  const modifiedCategoryCount: CategoryCounts = {};

  // Modifying the categoryCount array to a new object variable called modifiedCategoryCount, by assigning each category name as a key and its corresponding count as a value, then saved the modification in the modifiedCategoryCount object
  categoryCount?.forEach((item) => {
    modifiedCategoryCount[item._id.name] = item.count; // Assign the count to the category key
  });

  return (
    <button
      type="button"
      className="border border-zinc-300 p-8 hover:scale-105 duration-200 transition"
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
    </button>
  );
};

export default Category;
