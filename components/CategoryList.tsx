import { getCategories } from "@/database/actions/category.actions";
import Category from "./Category";

const CategoryList = async () => {
  const categories: Category[] | undefined = await getCategories();

  return (
    <>
      {categories && categories.length > 0 && (
        <section className="w-full grid grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </section>
      )}
    </>
  );
};

export default CategoryList;
