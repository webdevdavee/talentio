import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type ListLayoutProps = {
  layout: "row" | "column";
  setLayout: Dispatch<SetStateAction<"row" | "column">>;
};

const ListLayout = ({ layout, setLayout }: ListLayoutProps) => {
  return (
    <section className="flex items-center gap-3 m:hidden xl:hidden">
      <div
        className={`p-2 rounded cursor-pointer ${
          layout === "column" && "bg-[#d5efd6]"
        }`}
        onClick={() => setLayout("column")}
      >
        <Image src="/grid.svg" width={18} height={18} alt="grid" />
      </div>
      <div
        className={`p-2 rounded cursor-pointer ${
          layout === "row" && "bg-[#d5efd6]"
        }`}
        onClick={() => setLayout("row")}
      >
        <Image src="/row.svg" width={18} height={18} alt="row" />
      </div>
    </section>
  );
};

export default ListLayout;
