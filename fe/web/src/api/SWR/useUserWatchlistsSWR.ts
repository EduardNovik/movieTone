import useSWR from 'swr';
import axios from 'axios';
import { userSessionState } from '../../store/userSession';

const usersWatchlistsFetcher = (url: string) => {
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.log(err));
};

const useUserWatchlistsSWR = () => {
  const { user } = userSessionState();

  const { data, error, isLoading } = useSWR(
    user ? `${window.origin}/api/watchlist/all` : null,
    usersWatchlistsFetcher,
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useUserWatchlistsSWR;
