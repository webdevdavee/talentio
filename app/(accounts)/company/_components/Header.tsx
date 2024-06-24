"use client";

import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  company: Company;
};

const Header = ({ company }: HeaderProps) => {
  const handleShowMobileMenu = () => {
    useMobileMenuStore.setState({ menu: true });
    useOverlayStore.setState({ overlay: true });
  };

  return (
    <header className="w-full bg-white py-6 px-8 border-b border-b-gray-200 mb-3 m:p-4 m:sticky m:top-0 m:z-30 m:drop-shadow">
      <div className="flex items-center justify-between">
        <Image
          src="/menu2.svg"
          width={27}
          height={27}
          alt="menu"
          className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
          onClick={handleShowMobileMenu}
        />

        <div className="flex gap-3 items-center">
          <Image
            src={company.logo}
            width={50}
            height={50}
            alt="company-logo"
            className="m:hidden"
          />
          <span>
            <p className="text-sm text-gray-600 m:text-base">Company</p>
            <p className="font-semibold m:text-lg">{company.company}</p>
          </span>
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
          <Link
            href="/company/dashboard/post-job"
            className="flex gap-1 items-center p-2 bg-primary text-white font-medium"
          >
            <Image src="/plus.svg" width={25} height={25} alt="post-a-job" />
            <p>Post a job</p>
          </Link>
        </div>

        {/* For mobile */}
        <Link
          href="/company/dashboard/post-job"
          className="flex gap-1 items-center p-2 bg-primary text-white font-medium xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
        >
          <Image src="/plus.svg" width={25} height={25} alt="post-a-job" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
