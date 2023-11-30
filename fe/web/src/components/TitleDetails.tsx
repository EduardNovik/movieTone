import usePopularMovieByIdSWR from '../api/SWR/usePopularMovieByIdSWR';
import starIcon from '../assets/iconfinder_star.png';
import TitleSkeleton from '../components/skeletons/TitleSkeleton';

const TitleDetails = ({ id }: { id: string }) => {
  const { data, error, isLoading } = usePopularMovieByIdSWR(id);

  return (
    <div className="mt-[100px] flex flex-col justify-center items-center gap-6 relative">
      {isLoading ? (
        <TitleSkeleton numOfCards={1} />
      ) : data ? (
        <>
          <img
            src={`https://www.themoviedb.org/t/p/original/${data?.backdrop_path}`}
            alt="cover_img"
            className="rounded-lg h-auto w-1/2 "
            loading="lazy"
          />
          <h3 className="text-center font-sans text-2xl">
            {data.title ? data.title : data.name}
          </h3>
          <p className="flex gap-2  top-8 right-8 items-center">
            <b>IMDB:</b>
            <span className="text-yellow-500">
              {Math.round(data.vote_average * 10) / 10}
            </span>
            <img src={starIcon} alt="" className="w-4 h-4" />
          </p>
          <p>
            <b>Budget: </b>
            <span>{data.budget.toLocaleString()}$</span>
          </p>
          <p>
            <b>Genres: </b>

            {data?.genres.map((it: Record<string, any>, index: number) => {
              return (
                <span key={it?.id}>
                  {it?.name}
                  {index !== data.genres.length - 1 && ', '}
                </span>
              );
            })}
          </p>
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default TitleDetails;
