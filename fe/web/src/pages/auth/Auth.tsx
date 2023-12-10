import { useCallback, useEffect } from 'react';
import { getLoginAttemptInfo } from 'supertokens-auth-react/recipe/passwordless';
import { useNavigate } from '@tanstack/react-router';
import { consumeCode } from 'supertokens-auth-react/recipe/passwordless';
import axios from 'axios';
// import { useManageUserSession } from '../../store/userSessionStore';

async function hasInitialMagicLinkBeenSent() {
  return (await getLoginAttemptInfo()) !== undefined;
}

const isUserExistAndOnboarded = async () => {
  try {
    const res = await axios.get(`${window.origin}/api/user/onboarded`);
    return res.data.onboarded;
  } catch (error) {
    console.error('Error checking user onboarded status:', error);
    return false; // Assuming false when there's an error, you can handle it differently based on your requirements.
  }
};

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
        // ------------
        // const isUserExistAndOnboarded = async () => {
        //   try {
        //     const res = await axios.get(`${window.origin}/api/user/onboarded`);
        //     return res.data.onboarded;
        //   } catch (error) {
        //     console.error('Error checking user onboarded status:', error);
        //     return false; // Assuming false when there's an error, you can handle it differently based on your requirements.
        //   }
        // };

        // if (await isUserExistAndOnboarded()) {
        // }
        // (await isUserExistAndOnboarded())
        //   ? await navigate({ to: '/' })
        //   : await navigate({ to: '/signup' });
        // ------------

        const userOnboarded = await isUserExistAndOnboarded();
        console.log('consumeCode is okay');

        if (userOnboarded) {
          console.log('ZALUPA ONBOARDED');
          // await useManageUserSession();
          await navigate({ to: '/' });
        } else {
          await navigate({ to: '/signup' });
        }
      } else {
        // this can happen if the magic link has expired or is invalid
        // or if it was denied due to security reasons in case of automatic account linking

        window.alert('Login failed. Please try again');
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

  return <h3 className="text-2xl text-center mt-40">Verify User</h3>;
};

export default Auth;
