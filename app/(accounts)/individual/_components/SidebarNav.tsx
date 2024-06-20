"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <Link
          href="/individual/dashboard"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
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
        >
          <Image src="/love-black.svg" width={20} height={20} alt="logo" />
          <p>Saved jobs</p>
        </Link>
        <Link
          href="/individual/dashboard/messages"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard/messages" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
        >
          <Image src="/message.svg" width={20} height={20} alt="logo" />
          <p>Messages</p>
        </Link>
        <Link
          href="/jobs"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/individual/dashboard/jobs" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
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
        >
          <Image src="/gear2.svg" width={20} height={20} alt="logo" />
          <p>Settings</p>
        </Link>
      </ul>
    </nav>
  );
};

export default SidebarNav;
