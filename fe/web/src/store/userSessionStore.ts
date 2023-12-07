// import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
// import '../services/supertokens';
// import { create } from 'zustand';
// import axios from 'axios';

// interface UserInfoStateType {
//   user: Record<string, string>;
//   updateUserInfo: () => void;
// }

// export const fetchUserInfo = async () => {
//   if (await doesSessionExist()) {
//     const getCurrentUser = await axios.get(`${window.origin}/api/user/current`);
//     return getCurrentUser.data.user;
//   }
//   return { id: '', name: '', email: '' };
// };

// const userInfoState = create<UserInfoStateType>(set => ({
//   user: { id: '', name: '', email: '' },
//   updateUserInfo: async () => {
//     const newUser = await fetchUserInfo();
//     set({ user: newUser });
//   },
// }));

// export default userInfoState;

// -----------------------------------

// import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
// import '../services/supertokens';
// import { create } from 'zustand';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// interface UserSessionStateType {
//   user: Record<string, string> | null;
//   updateUserSession: (newUser: Record<string, string>) => void;
// }

// export const userSessionState = create<UserSessionStateType>(set => ({
//   user: null,
//   updateUserSession: newUser =>
//     set({
//       user: newUser,
//     }),
// }));

// export const useFetchUserInfo = async () => {=+
//   const [fetchedUser, setFetchedUser] = useState<Record<string, string> | null>(
//     null,
//   );
//   const getCurrentUser = await axios.get(`${window.origin}/api/user/current`);

//   useEffect(() => {
//     setFetchedUser(getCurrentUser.data.user);
//   }, [getCurrentUser.data.user]);

//   return fetchedUser;
// };

// const useLocalStorageSession = async () => {
//   const userSession = userSessionState();
//   const [loggedUserData, setLoggedUserData] = useState<Record<
//     string,
//     string
//   > | null>(null);
//   const fetchedUser = await useFetchUserInfo();

//   useEffect(() => {
//     const getLoggedUser = localStorage.getItem('loggedUser');
//     try {
//       setLoggedUserData(() => {
//         if (getLoggedUser !== null) {
//           if (
//             fetchedUser !== null &&
//             JSON.stringify(fetchedUser) !== getLoggedUser
//           ) {
//             localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
//             userSession.updateUserSession(fetchedUser);
//             return fetchedUser;
//           }
//           userSession.updateUserSession(JSON.parse(getLoggedUser));
//           return JSON.parse(getLoggedUser);
//         } else if (getLoggedUser === null && fetchedUser) {
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

// export const manageUserSession = async () => {
//   if (await doesSessionExist()) {
//     const data = await useLocalStorageSession();
//     return data;
//   }
//   return null;
// };

// ---------------------------------------------------------

import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import '../services/supertokens';
import { create } from 'zustand';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserSessionStateType {
  user: Record<string, string> | null;
  updateUserSession: (newUser: Record<string, string>) => void;
}

export const userSessionState = create<UserSessionStateType>(set => ({
  user: null,
  updateUserSession: newUser =>
    set({
      user: newUser,
    }),
}));

export const useFetchUserInfo = () => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${window.origin}/api/user/current`);
        setFetchedUser(response.data.user);
      } catch (error: any) {
        console.error('Error fetching user info:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // Empty dependency array to run the effect once on mount

  return { fetchedUser, isLoading, error };
};

export const useLocalStorageSession = () => {
  const userSession = userSessionState();
  const { fetchedUser } = useFetchUserInfo();
  const [loggedUserData, setLoggedUserData] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    const getLoggedUser = localStorage.getItem('loggedUser');
    try {
      setLoggedUserData(() => {
        if (getLoggedUser !== null) {
          if (
            JSON.stringify(fetchedUser) !== getLoggedUser &&
            fetchedUser !== null
          ) {
            localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
            userSession.updateUserSession(fetchedUser);
            return fetchedUser;
          }
          userSession.updateUserSession(JSON.parse(getLoggedUser));
          return JSON.parse(getLoggedUser);
        } else if (fetchedUser) {
          localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
          userSession.updateUserSession(fetchedUser);
          return fetchedUser;
        } else {
          return null;
        }
      });
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [fetchedUser]);

  return loggedUserData;
};
// export const useManageUserSession = async () => {
//   const isSessionExist = await doesSessionExist();
//   const localStorageSession = useLocalStorageSession();
//   if (isSessionExist) {
//     return localStorageSession;
//   }
//   return null;
// };
export const useManageUserSession = async () => {
  if (await doesSessionExist()) {
    return useLocalStorageSession();
  }
  return null;
};

// was async
// const useLocalStorageSession = async () => {
//   const userSession = userSessionState();
//   const [loggedUserData, setLoggedUserData] = useState<Record<
//     string,
//     string
//   > | null>(null);
//   const { fetchedUser } = useFetchUserInfo();

//   useEffect(() => {
//     const getLoggedUser = localStorage.getItem('loggedUser');
//     try {
//       setLoggedUserData(() => {
//         if (getLoggedUser !== null) {
//           if (JSON.stringify(fetchedUser) !== getLoggedUser) {
//             localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
//             userSession.updateUserSession(fetchedUser);
//             return fetchedUser;
//           }
//           userSession.updateUserSession(JSON.parse(getLoggedUser));
//           return JSON.parse(getLoggedUser);
//         } else if (getLoggedUser === null && fetchedUser) {
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
