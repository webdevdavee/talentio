import Image from "next/image";
import Link from "next/link";
import CategoryList from "./CategoryList";

const FeaturedCategories = () => {
  return (
    <section className="w-full px-16 mt-10 m:px-4 m:mt-12">
      <div className="flex items-center justify-between gap-3 mb-10">
        <h1 className="text-3xl font-bold m:text-2xl">
          Explore by <span className="text-primary">category</span>
        </h1>
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-primary font-semibold m:hidden"
        >
          <p>Show all jobs</p>
          <Image src="/arrow-right.svg" width={25} height={25} alt="arrow" />
        </Link>
      </div>
      <CategoryList />
      <Link
        href="/jobs"
        className="flex items-center gap-2 text-primary font-semibold m:mt-4"
      >
        <p>Show all jobs</p>
        <Image src="/arrow-right.svg" width={25} height={25} alt="arrow" />
      </Link>
    </section>
  );
};

export default FeaturedCategories;
