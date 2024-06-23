import { create } from "zustand";

type MobileMenuStore = {
  menu: boolean;
};

export const useMobileMenuStore = create<MobileMenuStore>(() => ({
  menu: false,
}));
