import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import trandingMovies from '../graphql/trandingMovies';
import useTrandingMoviesSWR from '../hooks/useTrandingMoviesSWR';

const Slider = () => {
  const [data, setData] = useState([]);

  async function fetch() {
    try {
      const { data, error, isLoading } = await useTrandingMoviesSWR();
      console.log(data);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  fetch();

  return (
    <div className="sliderWrap">
      {/* {data.map(item => (
        <div key={item.id}>
          <img
            src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
            alt="cover_img"
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      ))} */}
    </div>
  );
};

export default Slider;

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
