import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

const getMovieData = () => {
  const url = 'https://api.themoviedb.org/3/authentication';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTHORIZATION,
    },
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
};

export default getMovieData;
