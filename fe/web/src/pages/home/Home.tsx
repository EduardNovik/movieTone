import { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { MoviesInfoDataType } from '../../redux/moviesSlice';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import CardSkeleton from '../../components/skeletons/CardSkeleton';
import Sidebar from '../../components/Sidebar';
import MovieSlider from '../../components/MovieSlider';
import { fetchMoviesAsync } from '../../redux/moviesSlice';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchMoviesAsync(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      ),
    );
  }, []);
  const movies = useSelector<RootState, MoviesInfoDataType>(
    state => state.movies.data,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.movies.loading,
  );

  console.log('Home Component');

  return (
    <div>
      <MovieSlider />
      <div className="flex">
        <Sidebar />
        <div className="flex md:flex-row flex-col flex-wrap basis-full flex-1 justify-center items-center pt-20 gap-4">
          {isLoading ? (
            <CardSkeleton numOfCards={20} />
          ) : movies ? (
            movies.map((item: Record<string, any>) => (
              <Card key={item.id} item={item} />
            ))
          ) : (
            <div>Something went wrong, can't find movies list</div>
          )}
        </div>
      </div>
      <Pagination />
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
