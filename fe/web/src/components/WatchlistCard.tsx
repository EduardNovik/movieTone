import axios from 'axios';
import { useEffect, useState } from 'react';

const WatchlistCard = () => {
  const [watchlistsData, setWatchlistsData] = useState<
    Record<string, any>[] | []
  >([]);

  useEffect(() => {
    const asyncWraper = async () => {
      try {
        const fetchedWatchlists = await axios.get(
          `${window.origin}/api/watchlist/all`,
        );
        setWatchlistsData(fetchedWatchlists.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    asyncWraper();
  }, []);

  console.log(watchlistsData);

  return (
    Array.isArray(watchlistsData) &&
    watchlistsData.length > 0 &&
    watchlistsData.map(watchlist => (
      <div className="w-[200px] h-[200px] border-2  border-teal-500 items-center flex flex-col rounded-lg justify-center">
        <p>{watchlist.name}</p>
        <p>{watchlist.genre}</p>
        <p>{watchlist.id}</p>
      </div>
    ))
  );
};

export default WatchlistCard;
