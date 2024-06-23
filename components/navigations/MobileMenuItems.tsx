import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileMenuItems = () => {
  const pathname = usePathname();

  const handleClickOnNavItem = () => {
    useMobileMenuStore.setState({ menu: false });
    useOverlayStore.setState({ overlay: false });
  };

  return (
    <nav>
      <ul className="flex flex-col gap-3 items-center">
        <Link
          href="/jobs"
          className={`transition text-white duration-200 ${
            pathname === "/jobs" && "border-b-[2px] border-b-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          Find Jobs
        </Link>
        <Link
          href="/companies"
          className={`transition text-white duration-200 ${
            pathname === "/companies" && "border-b-[2px] border-b-primary"
          }`}
          onClick={handleClickOnNavItem}
        >
          Browse Companies
        </Link>
      </ul>
    </nav>
  );
};

export default MobileMenuItems;
