import { create } from "zustand";

type OverlayStore = {
  startDate: Date | null;
  endDate: Date | null;
};

export const useDateRangeStore = create<OverlayStore>(() => ({
  startDate: null,
  endDate: null,
}));
