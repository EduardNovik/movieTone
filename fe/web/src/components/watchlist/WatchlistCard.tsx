import { Button } from '@movieTone/ui';
import useUserWatchlistsSWR from '../../api/SWR/useUserWatchlistsSWR';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import { useNavigate, useParams } from '@tanstack/react-router';

interface Watchlist {
  id: string;
  name: string;
  genre: string;
}

const WatchlistCard = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const deleteWatchlist = async (watchlist: Watchlist) => {
    try {
      await axios.delete(`${window.origin}/api/watchlist/deleteWatchlist`, {
        data: {
          watchlistId: watchlist.id,
        },
      });
      mutate(`${window.origin}/api/watchlist/all`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data, error } = useUserWatchlistsSWR();

  return error ? (
    <p>Something went wrong</p>
  ) : data ? (
    data.map((watchlist: Watchlist) => (
      <div
        key={watchlist.id}
        className="w-[200px] h-[200px] border-2  border-teal-500 items-center flex flex-col rounded-lg justify-center cursor-pointer"
        onClick={() =>
          navigate({
            to: `/watchlist/$id`,
            params: { id: watchlist.id },
          })
        }
      >
        <p>{watchlist.name}</p>
        <p>{watchlist.genre}</p>
        <p>{watchlist.id}</p>
        <Button
          variant="destructive"
          onClick={() => deleteWatchlist(watchlist)}
        >
          Delete watchlist
        </Button>
      </div>
    ))
  ) : (
    <p className="text-xl">Log in first to see your watchlists</p>
  );
};

export default WatchlistCard;
