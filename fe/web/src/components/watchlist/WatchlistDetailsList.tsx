import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';

const WatchlistDetailsList = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const params = useParams({ strict: false });

  console.log(params.id);

  useEffect(() => {
    const getTitlesInWathclist = async () => {
      try {
        const response = await axios.post(
          `${window.origin}/api/watchlist/titles`,
          {
            data: {
              watchlistId: params.id,
            },
          },
        );
        setWatchlistData(response.data.titles);
      } catch (error: any) {
        console.log(error);
      }
    };

    getTitlesInWathclist();
  }, []);

  return (
    <ul>
      {watchlistData.map((title: any) => {
        return (
          <li key={title.id}>
            <div>
              <p>{title.name}</p>
              <p>{title.imdb}</p>
              <p>{title.year}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default WatchlistDetailsList;

// If you want to send something within request body with GET requests, params won't work - and neither will data, as it's only taken into account for PUT, POST, DELETE, and PATCH requests. There're several lengthy discussions about this feature, and here's the telling quote:
