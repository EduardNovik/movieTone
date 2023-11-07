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
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzQzMzcyNWQ1YmE0ZDZjZmJkNGU5ZjE2NGM2MmUyMyIsInN1YiI6IjY1MjQ2NThjNzQ1MDdkMDEzOTVmNjNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b6GcInguwRwWjg12RrHJEefSQiIGSFcQJ-eNSqu8LXg',
    },
  };
  return axios(options)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export default recommendedMovies;
