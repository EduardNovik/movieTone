// import getMovieData from '../graphql/movieAPI';

// getMovieData();

import useSessionState from '../hooks/useSessionState';

const Home = () => {
  const { sessionStateStore } = useSessionState();

  return sessionStateStore ? (
    <div>{sessionStateStore}</div>
  ) : (
    <div>Not logged in</div>
  );
};

export default Home;
