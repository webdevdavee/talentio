"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";
import MobileMenuItems from "../navigations/MobileMenuItems";
import { useMobileMenuStore } from "@/lib/store/MobileMenuStore";
import { useOverlayStore } from "@/lib/store/OverlayStore";

const Mobilemenu = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menu = useMobileMenuStore((state) => state.menu);

  // Handle clicks outside mobile menu
  useClickOutside(mobileMenuRef, () => {
    useMobileMenuStore.setState({ menu: false });
    useOverlayStore.setState({ overlay: false });
  });

  return (
    <section
      ref={mobileMenuRef}
      className="w-full bg-primary p-4 drop-shadow-lg z-[35] fixed top-0 xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
      style={{ display: menu ? "block" : "none" }}
    >
      <div>
        <MobileMenuItems />
      </div>
    </section>
  );
};

export default Mobilemenu;
