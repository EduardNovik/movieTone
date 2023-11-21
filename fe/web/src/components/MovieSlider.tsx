// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import trandingMovies from '../graphql/trandingMovies';

import useTrandingMoviesSWR from '../api/SWR/useTrandingMoviesSWR';
import MovieSliderSkeleton from './skeletons/MovieSliderSkeleton';
import Slider from 'react-slick';
import { useNavigate } from '@tanstack/react-router';

const MovieSlider = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useTrandingMoviesSWR();
  const settings = {
    fade: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToMovieCard = async (id: string) => {
    await navigate({ to: '/title/$id', params: { id } });
  };

  return (
    <Slider {...settings} className="mt-20">
      {isLoading ? (
        <MovieSliderSkeleton />
      ) : error ? (
        <div className="flex justify-center items-center p-6">{error}</div>
      ) : (
        data.map((item: Record<string, any>) => (
          <div
            key={item.id}
            className="relative cursor-pointer"
            onClick={() => {
              goToMovieCard(item.id);
            }}
          >
            <img
              src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
              alt="cover_img"
              className="rounded-lg"
              loading="lazy"
            />
            <p className="text-center absolute top-6 left-[20px] text-white font-bold">
              {item.title ? item.title : item.name}
            </p>
          </div>
        ))
      )}
    </Slider>
  );
};

export default MovieSlider;

//   useEffect(async () => {
//     const response = await trandingMovies();
//     async func always return promise even we dont
//     have return word if we log async func we will ger Promise<undefined>
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await trandingMovies();
//         setData(response);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);
