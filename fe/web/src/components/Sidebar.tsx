import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@movieTone/ui';

import { useDispatch } from 'react-redux';
import { fetchMoviesAsync } from '../redux/moviesSlice';
import { AppDispatch } from '../redux/store';

import usePageState from '../hooks/usePageState';
import useUrlState from '../hooks/useUrlState';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pageState = usePageState();
  const urlState = useUrlState();

  const dispatchUpcomingMovies = () => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageState.page}`;
    dispatch(fetchMoviesAsync(url));
    urlState.updateUrl(url);
  };

  const dispatchPopularMovies = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageState.page}`;
    dispatch(fetchMoviesAsync(url));
    urlState.updateUrl(url);
  };

  const dispatchUpcomingSeries = () => {
    const url = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${pageState.page}`;
    dispatch(fetchMoviesAsync(url));
    urlState.updateUrl(url);
  };

  const dispatchPopularSeries = () => {
    const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageState.page}`;
    dispatch(fetchMoviesAsync(url));
    urlState.updateUrl(url);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-1/6 pt-[80px] sticky pr-8 "
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Movies</AccordionTrigger>
        <AccordionContent
          onClick={dispatchUpcomingMovies}
          className="cursor-pointer"
        >
          Upcoming
        </AccordionContent>
        <AccordionContent
          onClick={dispatchPopularMovies}
          className="cursor-pointer"
        >
          Popular
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>TV Shows</AccordionTrigger>
        <AccordionContent
          onClick={dispatchUpcomingSeries}
          className="cursor-pointer"
        >
          Upcoming
        </AccordionContent>
        <AccordionContent
          onClick={dispatchPopularSeries}
          className="cursor-pointer"
        >
          Popular
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Sidebar;
