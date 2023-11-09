import useSWR from 'swr';
import trandingMovies from '../graphql/trandingMovies';

const useTrandingMoviesSWR = () => {
  const { data, error, isLoading } = useSWR(
    'https://api.themoviedb.org/3/trending/all/day?language=en-US',
    trandingMovies,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useTrandingMoviesSWR;
