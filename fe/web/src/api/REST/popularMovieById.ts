import axios from 'axios';

const popularMovies = (url: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  };
  return axios(url, options)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export default popularMovies;
// 'https://api.themoviedb.org/3/movie/movie_id?language=en-US', options;
// fetch('https://api.themoviedb.org/3/movie/31?language=en-US', options);
