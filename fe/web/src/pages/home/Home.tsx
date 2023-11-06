import { useEffect, useState } from 'react';
import { Skeleton } from '@movieTone/ui';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import popularMovies from '../../graphql/popularMovies';
import usePageState from '../../hooks/usePageState';

const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pageState = usePageState();

  async function popular() {
    try {
      const response = await popularMovies(pageState.page);
      setData(response.results);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    popular();
  }, [pageState.page]);

  console.log(data);

  return (
    <>
      <div className="flex md:flex-row flex-col flex-wrap basis-[100%] flex-1 justify-center items-center pt-20">
        {loading || data.length === 0 ? (
          <div className="w-full p-4 flex flex-col items-center md:w-1/2 gap-4">
            <Skeleton className="w-full h-[300px]" />
            <Skeleton className="w-full h-[40px]" />
          </div>
        ) : (
          data.map(item => <Card key={item.id} item={item} />)
        )}
      </div>
      <Pagination />
    </>
  );
};

export default Home;
