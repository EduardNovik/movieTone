import usePopularMovieByIdSWR from '../api/SWR/usePopularMovieByIdSWR';
import starIcon from '../assets/iconfinder_star.png';
import TitleSkeleton from '../components/skeletons/TitleSkeleton';

const TitleDetails = ({ id }: { id: string }) => {
  console.log(id);

  const { data, error, isLoading } = usePopularMovieByIdSWR(id);
  console.log(data);

  return (
    <div className="mt-[100px] flex flex-col justify-center items-center gap-6">
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
          <p className="text-center">{data.title ? data.title : data.name}</p>
          <span className="flex gap-2 absolute top-8 right-8 items-center">
            <p className="text-yellow-500">
              {Math.round(data.vote_average * 10) / 10}
            </p>
            <img src={starIcon} alt="" className="w-4 h-4" />
          </span>
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default TitleDetails;
