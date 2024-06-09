"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white py-6 px-8 border-b border-b-gray-200 mb-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {pathname === "/individual/dashboard"
            ? "My applications"
            : pathname === "/individual/dashboard/messages"
            ? "Messages"
            : pathname === "/individual/dashboard/jobs"
            ? "Jobs"
            : pathname === "/individual/dashboard/companies"
            ? "Companies"
            : "/individual/dashboard/settings"}
        </h1>
        <Link href="/" className="p-2 border border-gray-200 font-medium">
          Back to homepage
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
