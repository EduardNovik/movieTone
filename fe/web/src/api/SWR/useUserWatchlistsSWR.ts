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
  if (user) {
    const { data, error, isLoading } = useSWR(
      `${window.origin}/api/watchlist/all`,
      usersWatchlistsFetcher,
    );

    return {
      data,
      error,
      isLoading,
    };
  }
  return {
    data: null,
    error: null,
    isLoading: false,
  };
};

export default useUserWatchlistsSWR;
