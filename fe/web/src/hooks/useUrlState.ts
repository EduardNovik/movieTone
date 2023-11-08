import { create } from 'zustand';

interface UrlType {
  url: string;
  updateUrl: (newUrl: string) => void;
}

const useUrlState = create<UrlType>(set => ({
  url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  updateUrl: newUrl => set({ url: newUrl }),
}));

export default useUrlState;
