import SuperTokens from 'supertokens-auth-react';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';

SuperTokens.init({
  appInfo: {
    appName: 'movietonefe',
    apiDomain: window.origin,
    websiteDomain: window.origin,
    apiBasePath: '/api/auth',
    websiteBasePath: '/',
  },
  recipeList: [
    Session.init(),
    Passwordless.init({
      contactMethod: 'EMAIL',
    }),
  ],
});
