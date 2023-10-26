import axios from 'axios';

const getMovieData = () => {
  const url = 'https://api.themoviedb.org/3/authentication';
  const options = {
    method: 'GET',
    url,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.AUTHORIZATION}`,
    },
  };
  return axios(options)
    .then(res => console.log(res.data))
    .catch(err => console.error('error:' + err));
};
export default getMovieData;

// Other option fo how to write axios code
// const getMovieData = () => {
//   const url = 'https://api.themoviedb.org/3/authentication';
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzQzMzcyNWQ1YmE0ZDZjZmJkNGU5ZjE2NGM2MmUyMyIsInN1YiI6IjY1MjQ2NThjNzQ1MDdkMDEzOTVmNjNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b6GcInguwRwWjg12RrHJEefSQiIGSFcQJ-eNSqu8LXg',
//     },
//   };
//   return axios
//     .get(url, options)
//     .then(res => {
//       const data = res.data;
//       console.log(data);
//     })
//     .catch(err => console.error('error:' + err));
// };
