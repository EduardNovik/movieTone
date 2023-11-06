import { create } from 'zustand';

interface PageType {
  page: number;
  pageNext: () => void;
  pagePrev: () => void;
}

const usePageState = create<PageType>(set => ({
  page: 1,
  pageNext: () => set(state => ({ page: ++state.page })),
  pagePrev: () => set(state => ({ page: --state.page })),
}));

export default usePageState;
