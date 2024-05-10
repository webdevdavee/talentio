import Image from "next/image";

type CategoryCard2Props = {
  category: Category;
  fetchCompanies: (category: string) => Promise<void>;
};

const CategoryCard2 = ({ category, fetchCompanies }: CategoryCard2Props) => {
  return (
    <section className="p-4 border border-gray-300 bg-white hover:scale-105 hover:drop-shadow-md duration-200 transition cursor-pointer">
      <div
        className="flex flex-col gap-6"
        onClick={() => fetchCompanies(category.category)}
      >
        <p className="text-xl font-semibold">{category.category}</p>
        <Image
          src={category.icon}
          width={25}
          height={25}
          alt={category.category}
        />
      </div>
    </section>
  );
};

export default CategoryCard2;
