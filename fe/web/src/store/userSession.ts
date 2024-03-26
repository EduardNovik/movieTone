import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import '../services/supertokens';
import { create } from 'zustand';
import axios from 'axios';
import { useEffect, useState } from 'react';
interface UserSessionStateType {
  user: Record<string, string> | null;
  updateUserSession: (newUser: Record<string, string> | null) => void;
}

// use SWR here or we can use combination of localStorage and Zustand to persist state.
export const userSessionState = create<UserSessionStateType>(set => {
  const storedUser = localStorage.getItem('loggedUser');
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    updateUserSession: newUser => set({ user: newUser }),
  };
});

export const useFetchUserInfo = () => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncWraper = async () => {
      try {
        const sessionCheck = await doesSessionExist();
        if (!sessionCheck) {
          return;
        }

        const response = await axios.get(`${window.origin}/api/user/current`);
        setFetchedUser(response.data.user);
      } catch (error: any) {
        console.error('Error fetching user info:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    asyncWraper();
  }, []);

  return { fetchedUser, isLoading, error };
};

export const useManageUserSession = () => {
  const userSession = userSessionState();
  const { fetchedUser } = useFetchUserInfo();
  const [loggedUserData, setLoggedUserData] = useState<Record<
    string,
    string
  > | null>(null);

  console.log(fetchedUser, 'fetchedUser');

  useEffect(() => {
    const getLoggedUser = localStorage.getItem('loggedUser');

    if (fetchedUser === null) {
      localStorage.removeItem('loggedUser');
      return;
    }

    if (JSON.stringify(fetchedUser) === getLoggedUser) {
      return;
    }

    try {
      setLoggedUserData(() => {
        localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
        userSession.updateUserSession(fetchedUser);
        return fetchedUser;
      });
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [fetchedUser]);

  return loggedUserData;
};

// alternative---------------------------------------
// Overcomplicated useLocalStorageSession with if()----------------------------------------------

// export const useLocalStorageSession = () => {
//   const userSession = userSessionState();
//   const { fetchedUser } = useFetchUserInfo();
//   const [loggedUserData, setLoggedUserData] = useState<Record<
//     string,
//     string
//   > | null>(null);

//   useEffect(() => {
//     const getLoggedUser = localStorage.getItem('loggedUser');
//     try {
//       setLoggedUserData(() => {
//         if (getLoggedUser !== null) {
//           if (
//             JSON.stringify(fetchedUser) !== getLoggedUser &&
//             fetchedUser !== null
//           ) {
//             localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
//             userSession.updateUserSession(fetchedUser);
//             return fetchedUser;
//           }
//           userSession.updateUserSession(JSON.parse(getLoggedUser));
//           return JSON.parse(getLoggedUser);
//         } else if (fetchedUser) {
//           localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
//           userSession.updateUserSession(fetchedUser);
//           return fetchedUser;
//         } else {
//           return null;
//         }
//       });
//     } catch (error) {
//       console.error('Error accessing localStorage:', error);
//     }
//   }, [fetchedUser]);

//   return loggedUserData;
// };

// alternative---------------------------------------

// export const useFetchUserInfo2 = async () => {
//   try {
//     const fetchedUser = axios.get(`${window.origin}/api/user/current`);
//     return fetchedUser;
//   } catch (error: any) {
//     console.error('Error fetching user info:', error);
//     throw new Error(error);
//   }
// };

// export const useLocalStorageSession = () => {
// const [fetchedUser, setFetchedUser] = useState(null);
// const userSession = userSessionState();
// useFetchUserInfo2().then(data => setFetchedUser(data.data));
