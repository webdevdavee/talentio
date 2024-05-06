import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white px-16 py-4">
      <nav className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link href="/">
              <Image src="/talentio.svg" width={125} height={125} alt="logo" />
            </Link>
            <div className="flex items-center gap-8">
              <Link
                href="/jobs"
                className="transition duration-200 hover:text-primary"
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className="transition duration-200 hover:text-primary"
              >
                Browse Companies
              </Link>
              <Link
                href="/categories"
                className="transition duration-200 hover:text-primary"
              >
                Categories
              </Link>
            </div>
          </div>
          <div>
            <Link href="/sign-in" className="px-4 py-3">
              Login
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded bg-primary text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
