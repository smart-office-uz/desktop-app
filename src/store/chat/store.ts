import { create } from "zustand";
import type { IChatStore } from "./store.def";

export const useChatStore = create<IChatStore>((set) => ({
  isStaffDialogOpen: false,
  setIsStaffDialogOpen(isOpen) {
    set({
      isStaffDialogOpen: isOpen,
    });
  },
}));
