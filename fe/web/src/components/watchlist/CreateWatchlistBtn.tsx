import { useCallback } from 'react';
import axios from 'axios';
import { Button, useToast } from '@movieTone/ui';
import { useSWRConfig } from 'swr';

const CreateWatchlistBtn = () => {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  const addWatchlist = useCallback(async () => {
    try {
      await axios.post(`${window.origin}/api/watchlist/addWatchlist`, {
        name: 'List',
        genre: 'Drama',
      });
      toast({ title: 'Watchlist created.' });
      mutate(`${window.origin}/api/watchlist/all`);
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    }
  }, []);

  return (
    <Button
      onClick={addWatchlist}
      variant="outline"
      className="w-[200px] h-[200px] rounded-lg text-sm text-myViolet"
    >
      Create Watchlist
    </Button>
  );
};

export default CreateWatchlistBtn;
