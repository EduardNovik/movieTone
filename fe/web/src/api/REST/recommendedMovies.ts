import axios from 'axios';

type Page = number;

const recommendedMovies = (page: Page = 1) => {
  const pageString = page.toString();
  const url = `https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=${pageString}`;
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  };
  return axios(options)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export default recommendedMovies;
