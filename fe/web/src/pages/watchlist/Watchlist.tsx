import CreateWatchlistBtn from '../../components/CreateWatchlistBtn';
import WatchlistCard from '../../components/WatchlistCard';

const Watchlist = () => {
  return (
    <div className="mt-20 flex gap-10">
      <CreateWatchlistBtn />
      <WatchlistCard />
    </div>
  );
};

export default Watchlist;
