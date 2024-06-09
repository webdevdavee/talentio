import Image from "next/image";
import { SetStateAction } from "react";

type PerPageProps = {
  perPage: number;
  setPerPage: (value: SetStateAction<number>) => void;
};

const PerPage = ({ perPage, setPerPage }: PerPageProps) => {
  return (
    <section className="w-[10rem] flex item-center justify-center gap-3">
      <p className="w-fit flex items-center justify-center text-sm">
        Per Page:
      </p>
      <span className="relative w-[2.9rem]">
        <Image
          className="absolute right-1 top-1 -z-10"
          src="/chevron-arrow-down.svg"
          width={20}
          height={20}
          alt="arrow"
        />
        <select
          className="w-full bg-transparent px-1 border-[1px] border-gray-300 focus:outline-none appearance-none cursor-pointer"
          name="options"
          value={perPage}
          onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
      </span>
    </section>
  );
};

export default PerPage;
