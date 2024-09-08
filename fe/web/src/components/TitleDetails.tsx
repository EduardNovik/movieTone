import usePopularMovieByIdSWR from '../api/SWR/usePopularMovieByIdSWR';
import starIcon from '../assets/iconfinder_star.png';
import TitleSkeleton from '../components/skeletons/TitleSkeleton';
import { memo, useMemo } from 'react';

const TitleDetails = ({ id }: { id: string }) => {
  const { data, error, isLoading } = usePopularMovieByIdSWR(id);

  const title = useMemo(() => data?.title || data?.name, [data]);
  const voteAverage = useMemo(() => Math.round(data?.vote_average * 10) / 10, [data]);
  const budget = useMemo(() => data?.budget.toLocaleString(), [data]);
  const genres = useMemo(() => data?.genres?.map((it: Record<string, any>, index: number) => (
    <span key={it?.id}>
      {it?.name}
      {index !== data.genres.length - 1 && ', '}
    </span>
  )), [data]);

  if (isLoading) {
    return (
      <div className="mt-[100px] flex flex-col justify-center items-center gap-6 relative">
        <TitleSkeleton numOfCards={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-[100px] flex flex-col justify-center items-center gap-6 relative">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-[100px] flex flex-col justify-center items-center gap-6 relative">
      <img
        src={`https://www.themoviedb.org/t/p/original/${data?.backdrop_path}`}
        alt="cover_img"
        className="rounded-lg h-auto w-1/2"
        loading="lazy"
      />
      <h3 className="text-center font-sans text-2xl">
        {title}
      </h3>
      <p className="flex gap-2 top-8 right-8 items-center">
        <b>IMDB:</b>
        <span className="text-yellow-500">
          {voteAverage}
        </span>
        <img src={starIcon} alt="" className="w-4 h-4" />
      </p>
      <p>
        <b>Budget: </b>
        <span>{budget}$</span>
      </p>
      <p>
        <b>Genres: </b>
        {genres}
      </p>
    </div>
  );
};

export default memo(TitleDetails);
