# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

1. eslint is already in vite project dont need to install

2. prettier install:

npm i --save-dev --save-exact prettier

-then create:
.prettierrc.json

and add this to it:
{

    "tabWidth": 2,
    "semi": true,
    "singleQuote": true,
    "arrowParens": "avoid"

}

-then i:
npm install --save-dev eslint-config-prettier

-and to eslintrc.cjs add:
extends: [
'eslint:recommended',
'plugin:@typescript-eslint/recommended',
'plugin:react-hooks/recommended',
'prettier'
],

-and now we can check if there no conflict btw eslint and prettier with this:
npx eslint-config-prettier .\src\main.tsx

-we can create script for prettier in packagejson:
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview",
"format": "prettier --write ./src"
},

3. first try was with react-router-dom (example below),
   const router = createBrowserRouter([
   {
   path: '/',
   element: <App />,
   errorElement: <Error />,
   // children: [
   // {
   // path: 'contacts/:contactId',
   // element: <Contact />,
   // },
   // ],
   },
   {
   path: '/spacecraft',
   element: <Spacecraft />,
   },
   ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>,
);

the error component will look like this:

import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
// you don't need to explicitly set error to `unknown`
const error = useRouteError();
let errorMessage: string;

if (isRouteErrorResponse(error)) {
// error is type `ErrorResponse`
errorMessage = error.data.message || error.statusText;
} else if (error instanceof Error) {
errorMessage = error.message;
} else if (typeof error === 'string') {
errorMessage = error;
} else {
console.error(error);
errorMessage = 'Unknown error';
}

return (

<div
      id="error-page"
      className="flex flex-col gap-8 justify-center items-center h-screen"
    >
<h1 className="text-4xl font-bold">Oops!</h1>
<p>Sorry, an unexpected error has occurred.</p>
<p className="text-slate-400">
<i>{errorMessage}</i>
</p>
</div>
);
};

export default ErrorPage;

4. but I've decidet to use tanstack router

- npm install @tanstack/react-router@beta

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
Outlet,
RouterProvider,
Link,
Router,
Route,
RootRoute,
} from '@tanstack/react-router'

// Create a root route
const rootRoute = new RootRoute({
component: Root,
})

function Root() {
return (
<>

<div>
<Link to="/">Home</Link> <Link to="/about">About</Link>
</div>
<hr />
<Outlet />
</>
)
}

// Create an index route
const indexRoute = new Route({
getParentRoute: () => rootRoute,
path: '/',
component: Index,
})

function Index() {
return (

<div>
<h3>Welcome Home!</h3>
</div>
)
}

const aboutRoute = new Route({
getParentRoute: () => rootRoute,
path: '/about',
component: About,
})

function About() {
return <div>Hello from About!</div>
}

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

// Create the router using your route tree
const router = new Router({ routeTree })

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
interface Register {
router: typeof router
}
}

// Render our app!
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
const root = ReactDOM.createRoot(rootElement)
root.render(
<StrictMode>
<RouterProvider router={router} />
</StrictMode>,
)
}

5. type declaration for env

we add this to vite-env.d.ts to have autofill and types on .env

declare interface ImportMetaEnv {
API: string;
AUTHORIZATION: string;
// Add more custom environment variables as needed
}

also add this to vite.config.ts:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
resolve: {
alias: {
'@': path.resolve(\_\_dirname, './src'),
},
},
define: {
'import.meta.env.API': JSON.stringify(process.env.API),
'import.meta.env.AUTHORIZATION': JSON.stringify(process.env.AUTHORIZATION),
},
});

and then we can import type safe env values (ts will recognize the fields in .env ) like here:

headers: {
accept: 'application/json',
Authorization: import.meta.env.AUTHORIZATION,
},

6. Server fetch and client fetch
   But you need to make sure that you are using node-fetch and dotenv on server not on the client(for client we have axios)

import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

const getMovieData = () => {
const url = 'https://api.themoviedb.org/3/authentication';
const options = {
method: 'GET',
headers: {
accept: 'application/json',
Authorization: import.meta.env.AUTHORIZATION,
},
};

return fetch(url, options)
.then(res => res.json())
.then(json => console.log(json))
.catch(err => console.error('error:' + err));
};

export default getMovieData;
