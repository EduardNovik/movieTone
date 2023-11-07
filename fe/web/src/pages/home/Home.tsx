import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { MoviesInfoDataType } from '../../redux/moviesSlice';
import { fetchMoviesAsync } from '../../redux/moviesSlice';

import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import popularMovies from '../../graphql/popularMovies';
import usePageState from '../../hooks/usePageState';
import CardSkeleton from '../../components/CardSkeleton';
import Sidebar from '../../components/Sidebar';

const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pageState = usePageState();

  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector<RootState, MoviesInfoDataType>(
    state => state.movies.data,
  );

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
    const page = 1;
    dispatch(fetchMoviesAsync({ url, page }));
  }, []);

  console.log('REDUX', movies.results);

  async function popular() {
    try {
      setLoading(true);
      const response = await popularMovies(pageState.page);
      setData(response.results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    popular();
  }, [pageState.page]);

  console.log(data);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex md:flex-row flex-col flex-wrap basis-[100%] flex-1 justify-center items-center pt-20">
        {loading || data.length === 0 ? (
          <CardSkeleton numOfCards={20} />
        ) : (
          data.map(item => <Card key={item.id} item={item} />)
        )}
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
