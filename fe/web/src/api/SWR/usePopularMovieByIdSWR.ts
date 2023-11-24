import useSWR from 'swr';
import popularMovieById from '../REST/popularMovieById';

const usePopularMovieByIdSWR = (movieId: string) => {
  
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    popularMovieById,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default usePopularMovieByIdSWR;
