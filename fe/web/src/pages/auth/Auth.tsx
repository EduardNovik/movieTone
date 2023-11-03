import { useCallback, useEffect } from 'react';
import { getLoginAttemptInfo } from 'supertokens-auth-react/recipe/passwordless';
import { useNavigate } from '@tanstack/react-router';
import { consumeCode } from 'supertokens-auth-react/recipe/passwordless';

async function hasInitialMagicLinkBeenSent() {
  return (await getLoginAttemptInfo()) !== undefined;
}

const Auth = () => {
  const navigate = useNavigate();

  const handleMagicLinkClicked = useCallback(async () => {
    try {
      let response = await consumeCode();

      if (response.status === 'OK') {
        // if (
        //   response.createdNewRecipeUser &&
        //   response.user.loginMethods.length === 1
        // ) {
        //   // user sign up success
        //   // login
        // } else {
        //   // user sign in success
        //   // dashboard
        // }
        // window.location.assign('/home');

        void navigate({ to: '/signup' });
      } else {
        // this can happen if the magic link has expired or is invalid
        // or if it was denied due to security reasons in case of automatic account linking

        // window.alert('Login failed. Please try again');
        // window.location.assign('/auth');
        navigate({ to: '/' });
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert('Oops! Something went wrong.');
      }
    }
  }, []);

  useEffect(() => {
    void hasInitialMagicLinkBeenSent().then(res => {
      res ? void handleMagicLinkClicked() : console.log('Wrong device');
    });
  }, [handleMagicLinkClicked]);

  return <div>Verify</div>;
};

export default Auth;
