import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenuNav = () => {
  const pathname = usePathname();

  const handleClickOnNavItem = () => {
    useMobileMenuStore.setState({ menu: false });
    useOverlayStore.setState({ overlay: false });
  };

  return (
    <nav className="w-full">
      <ul className="flex flex-col gap-3">
        <Link
          href="/individual/dashboard"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          <Image src="/file.svg" width={20} height={20} alt="logo" />
          <p>My applications</p>
        </Link>
        <Link
          href="/individual/dashboard/saved-jobs"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard/saved-jobs" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          <Image src="/love-black.svg" width={20} height={20} alt="logo" />
          <p>Saved jobs</p>
        </Link>
        <Link
          href="/jobs"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard/jobs" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          <Image src="/search.svg" width={20} height={20} alt="logo" />
          <p>Find jobs</p>
        </Link>
        <Link
          href="/companies"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard/companies" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          <Image src="/building.svg" width={20} height={20} alt="logo" />
          <p>Companies</p>
        </Link>
        <Link
          href="/individual/dashboard/settings"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard/settings" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          <Image src="/gear2.svg" width={20} height={20} alt="logo" />
          <p>Settings</p>
        </Link>
      </ul>
    </nav>
  );
};

export default MobileMenuNav;
