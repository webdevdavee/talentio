import { getJobsCategoryCount } from "@/database/actions/job.actions";
import CategoryCard from "./CategoryCard";

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
    <CategoryCard
      category={category}
      modifiedCategoryCount={modifiedCategoryCount}
    />
  );
};

export default Category;
