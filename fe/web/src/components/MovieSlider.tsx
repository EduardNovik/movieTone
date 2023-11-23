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
  const goToMovieCard = (e: any, item: any) => {
    // e.stopPropagation();
    console.log(e.target);

    // const { id } = item;
    // console.log(id);
    // console.log(item);
    // navigate({ to: '/title/$id', params: { id } });
  };

  return (
    <Slider {...settings} className="mt-20">
      {isLoading ? (
        <MovieSliderSkeleton />
      ) : error ? (
        <div className="flex justify-center items-center p-6">{error}</div>
      ) : (
        data.map((item: Record<string, any>) => (
          <div key={item.id} className="relative cursor-pointer">
            <img
              src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
              alt="cover_img"
              className="rounded-lg"
              loading="lazy"
              onClick={e => {
                e.stopPropagation(), goToMovieCard(e, item);
              }}
            />
            <p className="text-center absolute top-6 left-[20px] text-white font-bold">
              {item.title ? item.title : item.name}
              {item.id}
            </p>
          </div>
        ))
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
