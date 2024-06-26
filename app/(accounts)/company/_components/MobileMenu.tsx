"use client";

import Image from "next/image";
import MobileMenuNav from "./MobileMenuNav";
import { signOut } from "next-auth/react";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";

const MobileMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menu = useMobileMenuStore((state) => state.menu);

  // Handle clicks outside menu
  useClickOutside(menuRef, () => {
    useMobileMenuStore.setState({ menu: false });
    useOverlayStore.setState({ overlay: false });
  });

  return (
    <aside
      ref={menuRef}
      className="fixed top-0 w-full bg-[#F5F5F5] flex flex-col justify-between py-6 px-4 overflow-hidden z-[35] drop-shadow-lg xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
      style={{ display: menu ? "block" : "none" }}
    >
      <div className="flex items-center justify-between gap-4 overflow-hidden border-b border-b-gray-300 pb-4 mb-6">
        <Image src="/talentio.svg" width={125} height={125} alt="logo" />
        <button
          type="button"
          className="text-red-500"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
      <MobileMenuNav />
    </aside>
  );
};

export default MobileMenu;
