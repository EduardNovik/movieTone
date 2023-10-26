import { create } from 'zustand';

interface RegisterModalType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModalState = create<RegisterModalType>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModalState;
