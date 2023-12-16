import useTrailerByIdSWR from '../api/SWR/useTrailerByIdSWR';
import TitleSkeleton from './skeletons/TitleSkeleton';

const TitleDetails = ({ id }: { id: string }) => {
  console.log(id);

  const { data, error, isLoading } = useTrailerByIdSWR(id);
  console.log(data);

  return (
    <div className="mt-[100px] flex flex-col justify-center items-center gap-6 relative">
      {isLoading ? (
        <TitleSkeleton numOfCards={1} />
      ) : data ? (
        // <div>
        //   {data?.results.map((trailer: Record<string, any>) => (
        //     <div key={trailer.id}>
        //       <iframe
        //         width="560"
        //         height="315"
        //         src={`https://www.youtube.com/embed/${trailer.key}`}
        //         title={trailer.name}
        //         allowFullScreen
        //       ></iframe>
        //     </div>
        //   ))}
        // </div>
        <div className="flex flex-col gap-2">
          {data?.results.slice(0, 3).map((trailer: Record<string, any>) => (
            <div key={trailer.id}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default TitleDetails;
