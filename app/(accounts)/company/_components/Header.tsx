"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  company: Company;
};

const Header = ({ company }: HeaderProps) => {
  return (
    <header className="w-full bg-white py-6 px-8 border-b border-b-gray-200 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image src={company.logo} width={50} height={50} alt="company-logo" />
          <span>
            <p className="text-sm text-gray-600">Company</p>
            <p className="font-semibold">{company.company}</p>
          </span>
        </div>
        <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
};

export default Header;
