"use client";

import Image from "next/image";

type SearchbarProps = {
  placeholder: string;
};

const Searchbar = ({ placeholder }: SearchbarProps) => {
  return (
    <form className="bg-white w-fit flex items-start gap-4">
      <div className="flex items-center gap-4 border-b border-b-zinc-300 py-2">
        <Image src="/search.svg" width={18} height={18} alt="search" />
        <div className="flex flex-col gap-2">
          <input
            // {...inputRegister}
            type="text"
            placeholder={placeholder}
            className="w-44 focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
