"use client";

import { useOverlayStore } from "@/lib/store/OverlayStore";

const Overlay = () => {
  const overlay = useOverlayStore((state) => state.overlay);

  return (
    <section
      className="bg-black w-full h-full fixed top-0 right-0 opacity-70 z-[35]"
      style={{ display: overlay ? "block" : "none" }}
    ></section>
  );
};

export default Overlay;
