import { create } from "zustand";

type OverlayStore = {
  overlay: boolean;
};

export const useOverlayStore = create<OverlayStore>(() => ({
  overlay: false,
}));
