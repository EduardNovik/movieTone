import axios from 'axios';

const trandingMovies = (url: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  };

  return axios(url, options)
    .then(res => res.data.results)
    .catch(err => {
      console.error('error:' + err);
      return Promise.reject(err);
    });
};

export default trandingMovies;
