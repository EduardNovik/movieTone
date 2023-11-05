// import getMovieData from '../graphql/movieAPI';
// getMovieData();
import { useEffect, useState } from 'react';
import trandingMovies from '../../graphql/trandingMovies';

const Home = () => {
  // const tranding = async () => await trandingMovies();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function tranding() {
    try {
      const response = await trandingMovies();
      setData(response.results);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    tranding();
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col">
      {data.length > 0 &&
        data.map(item => (
          <div key={item?.id} className=" flex flex-col items-center">
            <img
              src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
              alt="cover_img"
            />
            <p>{item.title ? item.title : item.name}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
