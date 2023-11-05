import axios from 'axios';

const trandingMovies = () => {
  const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
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
    .catch(err => console.error('error:' + err));
};

export default trandingMovies;
