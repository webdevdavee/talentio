"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white py-6 px-8 border-b border-b-gray-200 mb-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
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
        <div className="flex items-center gap-4">
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
