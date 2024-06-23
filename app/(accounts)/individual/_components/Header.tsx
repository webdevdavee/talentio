"use client";

import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const handleShowMobileMenu = () => {
    useMobileMenuStore.setState({ menu: true });
    useOverlayStore.setState({ overlay: true });
  };

  return (
    <header className="w-full bg-white py-6 px-8 border-b border-b-gray-200 mb-3 m:px-4">
      <div className="flex items-center justify-between">
        <Image
          src="/menu2.svg"
          width={27}
          height={27}
          alt="menu"
          className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
          onClick={handleShowMobileMenu}
        />
        <h1 className="text-2xl font-semibold sm:text-xl">
          {pathname === "/individual/dashboard"
            ? "My applications"
            : pathname === "/individual/dashboard/saved-jobs"
            ? "Saved jobs"
            : pathname === "/individual/dashboard/messages"
            ? "Messages"
            : pathname === "/individual/dashboard/jobs"
            ? "Jobs"
            : pathname === "/individual/dashboard/companies"
            ? "Companies"
            : "Settings"}
        </h1>

        {/* For mobile */}
        <div className="flex items-center gap-4 xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
          <button
            type="button"
            className="p-1 border border-red-400"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <Image src="/power.svg" width={20} height={20} alt="logout" />
          </button>
          <Link href="/" className="p-1 border border-gray-200 font-medium">
            <Image src="/home.svg" width={20} height={20} alt="home" />
          </Link>
        </div>

        {/* For desktop */}
        <div className="flex items-center gap-4 m:hidden">
          <button
            type="button"
            className="p-2 border border-red-200 font-medium text-red-400"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
          <Link href="/" className="p-2 border border-gray-200 font-medium">
            Back to homepage
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
