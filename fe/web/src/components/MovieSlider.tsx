import { useState } from 'react';
import useTrandingMoviesSWR from '../api/SWR/useTrandingMoviesSWR';
import MovieSliderSkeleton from './skeletons/MovieSliderSkeleton';
import { useNavigate } from '@tanstack/react-router';
import Slider from 'react-slick';

const MovieSlider = () => {
  const { data, error, isLoading } = useTrandingMoviesSWR();
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    arrow: imagesLoaded,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (currentSlide: number) => {
      // Check if all slides have been rendered
      if (currentSlide === data.length - 1) {
        setImagesLoaded(true);
      }
    },
  };

  return (
    <Slider {...settings} className="mt-20 max-h-[650px]">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index: number) => (
          <div key={index} className="relative cursor-pointer p-2">
            <MovieSliderSkeleton classNameCustom="aspect-[2/3]" />
          </div>
        ))
      ) : data.length === 20 ? (
        data.map((item: Record<string, any>) => (
          <div key={item.id} className="relative cursor-pointer p-2">
            <img
              src={`https://www.themoviedb.org/t/p/original/${item.poster_path}`}
              alt="cover_img"
              className="rounded-lg max-h-[650px] h-full"
              loading="lazy"
              onClick={() =>
                navigate({ to: '/title/$id', params: { id: item.id } })
              }
            />
            <p className="text-center absolute top-6 left-[20px] text-white font-bold">
              {item.title ? item.title : item.name}
            </p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-6 mt-[60px]">
          {error}
        </div>
      )}
    </Slider>
  );
};

export default MovieSlider;

// --------------------
//   useEffect(async () => {
//     const response = await trandingMovies();
//     async func always return promise even we dont
//     have return word if we log async func we will get Promise<undefined>
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

// -------doesnt help without swr

// import useTrandingMoviesSWR from '../api/SWR/useTrandingMoviesSWR';
// import MovieSliderSkeleton from './skeletons/MovieSliderSkeleton';
// import Slider from 'react-slick';
// import popularMovies from '../api/REST/popularMovies';
// import { useEffect, useState } from 'react';

// const MovieSlider = () => {
//   const [el, setEl] = useState([]);
//   const settings = {
//     fade: true,
//     infinite: true,
//     speed: 400,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   useEffect(() => {
//     const fetchPopularMovies = async () => {
//       try {
//         const res = await popularMovies();
//         console.log(res);

//         setEl(res.results);
//       } catch (error) {
//         console.error('Error fetching popular movies:', error);
//       }
//     };

//     fetchPopularMovies();
//   }, []);

//   return (
//     <Slider {...settings} className="mt-20">
//       {el.map((item: Record<string, any>) => (
//         <div key={item.id} className="relative cursor-pointer">
//           <img
//             src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
//             alt="cover_img"
//             className="rounded-lg"
//             loading="lazy"
//             onClick={() => console.log(item.id)}
//           />
//           <p
//             className="text-center absolute top-6 left-[20px] text-white font-bold"
//             onClick={() => console.log(item)}
//           >
//             {item.title ? item.title : item.name}
//             {item.id}
//           </p>
//         </div>
//       ))}
//     </Slider>
//   );
// };
