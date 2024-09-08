import CreateWatchlistMenu from '../../components/watchlist/CreateWatchlistMenu';
import WatchlistCard from '../../components/watchlist/WatchlistCard';

const Watchlist = () => {
  console.log('Watchlist Component');

  return (
    <div className="mt-24 flex flex-col gap-4 ">
      <CreateWatchlistMenu />
      <div className="flex flex-wrap gap-4 items-center ">
        <WatchlistCard />
      </div>
    </div>
  );
};

export default Watchlist;
