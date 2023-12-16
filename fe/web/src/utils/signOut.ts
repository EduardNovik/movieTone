import STGeneralError from 'supertokens-web-js/lib/build/error.js';
import { signOut as stSignOut } from 'supertokens-web-js/recipe/session/index.js';

export const isSuperTokensGeneralError = STGeneralError.isThisError;

export const signOut = async () => {
  await stSignOut();

  window.location.href = '/';
};
