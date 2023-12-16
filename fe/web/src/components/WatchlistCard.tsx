import { useCallback } from 'react';
import axios from 'axios';
import { useToast } from '@movieTone/ui';

const WatchlistCard = () => {
  const { toast } = useToast();

  // const addWatchlist = useCallback(async () => {
  //   try {
  //     await axios.post(`${window.origin}/watchlist/addWatchlist`, {
  //       name: 'My List',
  //       genre: 'Horror',
  //     });

  //     toast({ title: 'Watchlist created.' });
  //   } catch (error) {
  //     console.log(error);
  //     toast({ variant: 'destructive', title: 'Something went wrong.' });
  //   }
  // }, []);

  const addWatchlist = async () => {
    try {
      await axios.post(`${window.origin}/api/watchlist/addWatchlist`, {
        name: 'List',
        genre: 'Horror',
      });

      toast({ title: 'Watchlist created.' });
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    }
  };

  return (
    <div className="w-[300px] h-[300px] border-2  border-teal-500 items-center flex flex-col rounded-lg justify-center">
      <p>Create Watchlist</p>
      <button onClick={addWatchlist}>+</button>
    </div>
  );
};

export default WatchlistCard;
