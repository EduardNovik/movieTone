import { useCallback, useState } from 'react';
import axios from 'axios';
import {
  Button,
  useToast,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@movieTone/ui';
import { useSWRConfig } from 'swr';
import { Library } from 'lucide-react';

const CreateWatchlistMenu = () => {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const [watchlistName, setWatchlistName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Other');

  const addWatchlist = useCallback(async () => {
    // if (!watchlistName || !selectedGenre) {
    //   toast({ variant: 'destructive', title: 'Name and genre required.' });
    //   return;
    // }
    try {
      await axios.post(`${window.origin}/api/watchlist/addWatchlist`, {
        name: watchlistName,
        genre: selectedGenre,
      });
      toast({ title: 'Watchlist created.' });
      mutate(`${window.origin}/api/watchlist/all`);
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: 'Something went wrong.' });
    }
  }, []);

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Watchlist name"
        value={watchlistName}
        onChange={event => setWatchlistName(event.target.value)}
      />
      <Select
        value={selectedGenre}
        onValueChange={value => setSelectedGenre(value)}
      >
        <SelectTrigger className="max-w-[190px] w-full">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a genre</SelectLabel>
            <SelectItem value="Drama">Drama</SelectItem>
            <SelectItem value="Comedy">Comedy</SelectItem>
            <SelectItem value="Triller">Triller</SelectItem>
            <SelectItem value="Horror">Horror</SelectItem>
            <SelectItem value="Sci-fi">Sci-fi</SelectItem>
            <SelectItem value="Historical">Historical</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit" onClick={addWatchlist} variant="secondary">
        <Library className="mr-2" />
        <span className="mr-1">New</span>
        <span>Watchlist</span>
      </Button>
    </div>
  );
};

export default CreateWatchlistMenu;
