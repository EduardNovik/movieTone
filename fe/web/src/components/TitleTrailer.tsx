import useTrailerByIdSWR from '../api/SWR/useTrailerByIdSWR';
import TrailerSkeleton from './skeletons/TrailerSkeleton';
import Slider from 'react-slick';

const TitleDetails = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useTrailerByIdSWR(id);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (error) {
    return (
      <div className="mt-[100px] flex flex-col justify-center items-center gap-6 relative">
        {error}
      </div>
    );
  }

  return (
    <Slider {...settings} className="w-full">
      {isLoading
        ? Array(3)
            .fill(0)
            .map((_, i) => <TrailerSkeleton key={i} />)
        : data?.results
            .slice(0, 3)
            .map((trailer: Record<string, any>) => (
              <iframe
                key={trailer.id}
                className="max-w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allowFullScreen
                loading="lazy"
              ></iframe>
            ))}
    </Slider>
  );
};

export default TitleDetails;
