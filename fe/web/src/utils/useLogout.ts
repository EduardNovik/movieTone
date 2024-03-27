import STGeneralError from 'supertokens-web-js/lib/build/error.js';
import { signOut } from 'supertokens-web-js/recipe/session/index.js';
import { userSessionState } from '../store/userSession';

export const isSuperTokensGeneralError = STGeneralError.isThisError;

export const useLogout = () => {
  const { updateUserSession } = userSessionState();

  const logoutAndCleanState = async () => {
    try {
      await signOut();
      localStorage.removeItem('loggedUser');
      updateUserSession(null);
      // window.location.href = '/';
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return logoutAndCleanState;
};
