import useSWR from 'swr';
import trandingMovies from '../REST/trandingMovies';

const useTrandingMoviesSWR = () => {
  const { data, error, isLoading } = useSWR(
    'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    trandingMovies,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useTrandingMoviesSWR;
