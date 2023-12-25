import { Button } from '@movieTone/ui';
import { Input } from '@movieTone/ui';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoviesAsync } from '../redux/moviesSlice';
import useUrlState from '../hooks/useUrlState';
import { AppDispatch } from '../redux/store';
import usePageState from '../hooks/usePageState';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const urlState = useUrlState();
  const pageState = usePageState();

  // console.log(urlState.url);

  useEffect(() => {
    dispatch(fetchMoviesAsync(urlState.url));
  }, [urlState.url]);

  const onSearch = () => {

    urlState.updateUrl(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${pageState.page}`,
    );

    if (query == '') {
      urlState.updateUrl(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      );
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 relative">
      <Input
        className="focus:ring-offset-2"
        type="text"
        placeholder="Search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        className="dark:search_btn_dark search_btn_light absolute right-0 hover:bg-gray-100"
        onClick={onSearch}
      >
        <Search className="pr-1" size={20} />
      </Button>
    </div>
  );
};

export default SearchBar;
