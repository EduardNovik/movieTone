import CreateWatchlistBtn from '../../components/watchlist/CreateWatchlistBtn';
import WatchlistCard from '../../components/watchlist/WatchlistCard';

const Watchlist = () => {
  return (
    <div className="mt-24 flex flex-wrap gap-4 items-center">
      <WatchlistCard />
      <CreateWatchlistBtn />
    </div>
  );
};

export default Watchlist;
