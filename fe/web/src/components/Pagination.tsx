import { useEffect } from 'react';
import { Button } from '@movieTone/ui';
import popularMovies from '../graphql/popularMovies';
import usePageState from '../hooks/usePageState';

const Pagination = () => {
  const pageState = usePageState();

  async function popular(page: number) {
    await popularMovies(page);
  }
  const goNext = () => {
    pageState.pageNext();
  };
  const goPrev = () => {
    if (pageState.page === 1) {
      return;
    }
    pageState.pagePrev();
  };

  useEffect(() => {
    popular(pageState.page);
  }, [popularMovies, pageState.page]);

  return (
    <div className="flex gap-6 justify-center">
      <Button
        className="bg-white dark:bg-black text-black hover:bg-gray-100"
        onClick={goPrev}
      >
        Prev
      </Button>
      <Button
        className="bg-white dark:bg-black text-black hover:bg-gray-100"
        onClick={goNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
