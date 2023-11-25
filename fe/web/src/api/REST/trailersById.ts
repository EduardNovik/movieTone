import axios from 'axios';

const trailerById = async (url: string) => {
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  };

  try {
    const res = await axios(options);
    return res.data;
  } catch (err) {
    throw new Error(err as any);
  }
};

export default trailerById;
