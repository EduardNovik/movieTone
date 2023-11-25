import useSWR from 'swr';
import trailerById from '../REST/trailersById';

const useTrailerByIdSWR = (id: string) => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    trailerById,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useTrailerByIdSWR;
