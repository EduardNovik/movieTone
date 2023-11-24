import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { MoviesInfoDataType } from '../../redux/moviesSlice';
import { fetchMoviesAsync } from '../../redux/moviesSlice';

import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import useUrlState from '../../hooks/useUrlState';
import CardSkeleton from '../../components/skeletons/CardSkeleton';
import Sidebar from '../../components/Sidebar';
import MovieSlider from '../../components/MovieSlider';

const Home = () => {
  const urlState = useUrlState();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector<RootState, MoviesInfoDataType>(
    state => state.movies.data,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.movies.loading,
  );

  useEffect(() => {
    dispatch(fetchMoviesAsync(urlState.url));
  }, [urlState.url]);

  return (
    <div>
      <MovieSlider />
      <div className="flex">
        <Sidebar />
        <div className="flex md:flex-row flex-col flex-wrap basis-[100%] flex-1 justify-center items-center pt-20">
          {isLoading ? (
            <CardSkeleton numOfCards={20} />
          ) : movies ? (
            movies.map((item: Record<string, any>) => (
              <Card key={item.id} item={item} />
            ))
          ) : (
            <div>Something went wrong, cant find movies list</div>
          )}
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Home;

// import usePageState from '../../hooks/usePageState';
// import popularMovies from '../../graphql/popularMovies';
// const [data, setData] = useState<any[]>([]);
// const [loading, setLoading] = useState(true);
// const pageState = usePageState();

// async function popular() {
//   try {
//     setLoading(true);
//     const response = await popularMovies(pageState.page);
//     setData(response.results);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     setLoading(false);
//   }
// }

// useEffect(() => {
//   popular();
// }, [pageState.page, movies]);
