import Image from "next/image";

type SearchbarProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
};

const Searchbar = ({ query, setQuery, placeholder }: SearchbarProps) => {
  return (
    <form className="bg-white w-fit flex items-start gap-4 m:w-full xl:w-full">
      <div className="flex items-center gap-4 border-b border-b-zinc-300 py-2 m:w-full xl:w-full">
        <Image src="/search.svg" width={18} height={18} alt="search" />
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder={placeholder}
            className="w-44 focus:outline-none m:w-full xl:w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
