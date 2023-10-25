import { create } from 'zustand';

interface LoginModalType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModalState = create<LoginModalType>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModalState;
