import useSWR from 'swr';
import axios from 'axios';

const usersWatchlistsFetcher = (url: string) => {
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.log(err));
};

const useUserWatchlistsSWR = () => {
  const { data, error, isLoading } = useSWR(
    `${window.origin}/api/watchlist/all`,
    usersWatchlistsFetcher,
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useUserWatchlistsSWR;
