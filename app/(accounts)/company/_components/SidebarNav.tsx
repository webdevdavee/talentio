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
          href="/company/dashboard"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/company/dashboard" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
        >
          <Image src="/home.svg" width={20} height={20} alt="dashboard" />
          <p>Dashboard</p>
        </Link>
        <Link
          href="/company/dashboard/messages"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/company/dashboard/messages" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
        >
          <Image src="/message.svg" width={20} height={20} alt="logo" />
          <p>Messages</p>
        </Link>
        <Link
          href="/company/dashboard/profile"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/company/dashboard/profile" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
        >
          <Image src="/building.svg" width={20} height={20} alt="logo" />
          <p>Company profile</p>
        </Link>
        <Link
          href="/company/dashboard/applicants"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/company/dashboard/applicants" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
        >
          <Image src="/people.svg" width={20} height={20} alt="logo" />
          <p>All applicants</p>
        </Link>
        <Link
          href="/company/dashboard/job-list"
          className={`flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-200 transition hover:border-l-[2px] hover:border-l-primary ${
            pathname === "/company/dashboard/job-list" &&
            "bg-gray-200 border-l-[2px] border-l-primary"
          }`}
        >
          <Image src="/card-list.svg" width={20} height={20} alt="logo" />
          <p>Job listing</p>
        </Link>
      </ul>
    </nav>
  );
};

export default SidebarNav;
