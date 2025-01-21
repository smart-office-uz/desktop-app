export type IChatStore = State & Actions;

interface State {
  isStaffDialogOpen: boolean;
}

interface Actions {
  setIsStaffDialogOpen(isOpen: boolean): void;
}
