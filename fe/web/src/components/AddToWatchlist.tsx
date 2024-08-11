import { Plus, ScrollText } from 'lucide-react';
import { Button, useToast } from '@movieTone/ui';
import axios from 'axios';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from '@movieTone/ui';
import useUserWatchlistsSWR from '../api/SWR/useUserWatchlistsSWR';

interface Watchlist {
  id: string;
  name: string;
  ganre: string;
  userId: string;
}

const AddToWatchlist = () => {
  const { data } = useUserWatchlistsSWR();
  const { toast } = useToast();
  console.log(data);

  const addTitleToWatchlist = async (watchlist: Watchlist) => {
    try {
      await axios.post(`${window.origin}/api/watchlist/addTitle`, {
        id: item.id,
        name: item.title ? item.title : item.name,
        img: item.backdrop_path,
        imdb: item.vote_average,
        year: parseInt(item.release_date.replace(/-/g, '')),
        description: item.overview,
        watchlistid: watchlist.id,
      });
      toast({ title: 'Title added' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
      console.log(error);
    }
  };
  return (
    Array.isArray(data) && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="py-0 px-2">
            <ScrollText size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-xs">
          <DropdownMenuGroup>
            {data?.map((watchlist: Watchlist) => {
              return (
                <DropdownMenuItem
                  key={watchlist.id}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => addTitleToWatchlist(watchlist)}
                >
                  {watchlist.name}
                  <DropdownMenuShortcut>
                    <Plus size={15} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

export default AddToWatchlist;
