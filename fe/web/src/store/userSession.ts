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

  try {
    const user = storedUser ? JSON.parse(storedUser) : null;

    return {
      user: user,
      updateUserSession: newUser => set({ user: newUser }),
    };
  } catch (error) {
    console.error(
      'Error parsing storedUser as JSON in userSessionState:',
      error,
    );
    localStorage.removeItem('loggedUser');
    return {
      user: null,
      updateUserSession: newUser => set({ user: newUser }),
    };
  }
});

export const useFetchUserInfo = () => {
  return new Promise<Record<string, any> | null>((resolve, reject) => {
    const fetchData = async () => {
      try {
        const sessionCheck = await doesSessionExist();
        if (!sessionCheck) {
          resolve(null);
          return;
        }

        const response = await axios.get(`${window.origin}/api/user/current`);
        resolve(response.data.user);
      } catch (error) {
        console.error('Error fetching user info:', error);
        reject(error);
      }
    };

    fetchData();
  });
};

export const useManageUserSession = () => {
  const userSession = userSessionState();

  const [loggedUserData, setLoggedUserData] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        const getLoggedUser = localStorage.getItem('loggedUser');
        const fetchedUser = await useFetchUserInfo();
        console.log(fetchedUser, 'fetchedUser');

        if (fetchedUser === null) {
          localStorage.removeItem('loggedUser');
          return;
        }

        if (JSON.stringify(fetchedUser) === getLoggedUser) {
          return;
        }

        setLoggedUserData(() => {
          localStorage.setItem('loggedUser', JSON.stringify(fetchedUser));
          userSession.updateUserSession(fetchedUser);
          return fetchedUser;
        });
      } catch (error) {
        console.error(
          'Error in useManageUserSession during exec of  useFetchUserInfo():',
          error,
        );
      }
    };
    asyncWrapper();
  }, []);

  return loggedUserData;
};
