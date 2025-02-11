export type IChatStore = State & Actions;

interface State {
  isStaffDialogOpen: boolean;
  isCreateNewGroupDialogOpen: boolean;
}

interface Actions {
  setIsStaffDialogOpen(isOpen: boolean): void;
  setIsCreateNewGroupDialogOpen(isOpen: boolean): void;
}
