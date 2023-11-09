import axios from 'axios';

const trandingMovies = (url: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzQzMzcyNWQ1YmE0ZDZjZmJkNGU5ZjE2NGM2MmUyMyIsInN1YiI6IjY1MjQ2NThjNzQ1MDdkMDEzOTVmNjNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b6GcInguwRwWjg12RrHJEefSQiIGSFcQJ-eNSqu8LXg',
    },
  };

  return axios(url, options)
    .then(res => res.data.results)
    .catch(err => console.error('error:' + err));
};

export default trandingMovies;
