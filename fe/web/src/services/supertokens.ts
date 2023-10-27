import SuperTokens from 'supertokens-auth-react';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';

SuperTokens.init({
  appInfo: {
    appName: 'movietonefe',
    apiDomain: 'http://localhost:3000/',
    websiteDomain: window.origin,
    apiBasePath: '/auth',
    websiteBasePath: '/login',
  },
  recipeList: [
    Passwordless.init({
      contactMethod: 'EMAIL',
    }),
    Session.init(),
  ],
});
