import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';

const WatchlistDetailsList = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const params = useParams({ strict: false });

  useEffect(() => {
    const getTitlesInWatchlist = async () => {
      try {
        const response = await axios.post(
          `${window.origin}/api/watchlist/titles`,
          {
            watchlistId: params.id, // Correct structure
          },
        );

        setWatchlistData(response.data.titles);
      } catch (error: any) {
        console.log(error);
      }
    };

    getTitlesInWatchlist();
  }, []);

  return (
    <ul>
      {watchlistData.map((item: any) => {
        return (
          <li key={item.titles.id} className="mt-20">
            <div>
              <img
                src={`https://www.themoviedb.org/t/p/original/${item.titles.img}`}
              />
              <p>Watchlist details</p>
              <p>{item.titles.name}</p>
              <p>{item.titles.imdb}</p>
              <p>{item.titles.year}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default WatchlistDetailsList;

// If you want to send something within request body with GET requests, params won't work - and neither will data, as it's only taken into account for PUT, POST, DELETE, and PATCH requests. There're several lengthy discussions about this feature, and here's the telling quote:
