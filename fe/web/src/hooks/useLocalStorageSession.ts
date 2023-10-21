import { useEffect, useState } from 'react';
import useCurrentUser from './useCurrentUser';

const useLocalStorageSession = () => {
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser);

  const [sessionData, setSessionData] = useState(null);
  const getLocalStorage = localStorage.getItem('data');

  useEffect(() => {
    setSessionData(() => {
      if (getLocalStorage !== null) {
        return JSON.parse(getLocalStorage);
      } else if (currentUser) {
        localStorage.setItem('data', JSON.stringify(currentUser));
        return;
      }
    });
  }, []);

  return sessionData;
};

export default useLocalStorageSession;
