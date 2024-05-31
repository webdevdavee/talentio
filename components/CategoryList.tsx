import { categories } from "@/constants";
import Category from "./Category";

const CategoryList = async () => {
  return (
    <>
      <section className="w-full grid grid-cols-4 gap-6">
        {categories.slice(0, 8).map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </section>
    </>
  );
};

export default CategoryList;
