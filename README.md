# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

---[FIRST_TRY_]:

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
import 'dotenv/config'; (important to have this)

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
   But you need to make sure that you are using node-fetch on server not on the client(for client we have axios)

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

---[ADD_TURBOREPO]:

I've decided to move to turborepo:

-First step npx create-turbo@latest

-then Ive changed turbo.json:

{
"$schema": "https://turbo.build/schema.json",
"globalDependencies": ["**/.env.*local"],
"pipeline": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**"]
},
"lint": {},
"dev": {
"cache": false,
"persistent": true
}
}
}

---[ADD_TS]:

1. In web folder in fe tsconfig:

{
"extends": "tsconfig/vite.json",
"include": ["src"]
}

2. in packages/tsconfig folder add

vite.json:

(from example)
{
"extends": "./base.json",
"compilerOptions": {
"target": "ESNext",
"useDefineForClassFields": true,
"module": "ESNext",
"lib": ["ESNext", "DOM"],
"sourceMap": true,
"resolveJsonModule": true,
"noEmit": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true
},
"exclude": ["node_modules"]
}

(new)
{
"extends": "./base.json",
"compilerOptions": {
"target": "ES2020",
"useDefineForClassFields": true,
"lib": ["ES2020", "DOM", "DOM.Iterable"],
"module": "ESNext",
"skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "sourceMap": true,

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["../../fe/web/src/*"]
    }

},
"include": ["src"],
"references": [{ "path": "./tsconfig.node.json" }],
"exclude": ["node_modules"]
}

base.json:

{
"$schema": "https://json.schemastore.org/tsconfig",
"display": "Default",
"compilerOptions": {
"composite": false,
"declaration": true,
"declarationMap": true,
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"inlineSources": false,
"isolatedModules": true,
"moduleResolution": "node",
"noUnusedLocals": false,
"noUnusedParameters": false,
"preserveWatchOutput": true,
"skipLibCheck": true,
"strict": true
},
"exclude": ["node_modules"]
}

3. in fe package.json:

{
"name": "NAME OF FOLDER WHERE YOU HAVE PACKAGEJSON",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview",
"format": "prettier --write ./src"
},
"dependencies": {
"@radix-ui/react-dropdown-menu": "^2.0.6",
"@radix-ui/react-slot": "^1.0.2",
"@tanstack/react-router": "^0.0.1-beta.194",
"@tanstack/router-devtools": "^0.0.1-beta.194",
"axios": "^1.5.1",
"class-variance-authority": "^0.7.0",
"clsx": "^2.0.0",
"dotenv": "^16.3.1",
"localforage": "^1.10.0",
"lucide-react": "^0.282.0",
"match-sorter": "^6.3.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"sort-by": "^0.0.2",
"tailwind-merge": "^1.14.0",
"tailwindcss-animate": "^1.0.7",
"zod": "^3.22.2"
},
"devDependencies": {
"@types/node": "^20.8.2",
"@types/react": "^18.2.15",
"@types/react-dom": "^18.2.7",
"@typescript-eslint/eslint-plugin": "^6.0.0",
"@typescript-eslint/parser": "^6.0.0",
"@vitejs/plugin-react-swc": "^3.3.2",
"autoprefixer": "^10.4.16",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.3",
"postcss": "^8.4.31",
"prettier": "3.0.3",
"tailwindcss": "^3.3.3",
"eslint": "^8.50.0",
"eslint-config-custom": "\*",
"tsconfig": "\*",
"typescript": "^5.0.2",
"vite": "^4.4.5"
}
}

removed
// "eslint-config-prettier": "^9.0.0",

4. in packages/tsconfig folder add react-library.json:

{
"$schema": "https://json.schemastore.org/tsconfig",
"display": "React Library",
"extends": "./base.json",
"compilerOptions": {
"jsx": "react-jsx",
"lib": ["ES2015"],
"module": "ESNext",
"target": "es6"
}
}

---[FIX_npm_i_issue]:

1. (npm ERR! code EUNSUPPORTEDPROTOCOL npm ERR! Unsupported URL Type "workspace:": workspace:\*)

! npm using asterics "_" so it should be -> tsconfig": "_",
! pnpm using "workspace:_" so it should be -> tsconfig": "workspace:_",

in global package.json:

"workspaces": [
"fe/*",
"packages/*"
]

in fe package.json:

"devDependencies": {
"eslint-config-custom": "\*",
"tsconfig": "\*",
}

2.  (error: PS F:\Frontend\Self Edu\Projects\movieTone\fe\web> npm i
    npm ERR! Cannot set properties of null (setting 'dev'))

the name in package.json should be the same as folder name where its located
after I have changed the name to web which is folder name, my npm i
and path of tsconfig start to work

if it didnt help, then you can try to delete .turbo and run npm i again.

{
"name": "web",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview",
"format": "prettier --write ./src"
},
"dependencies": {
"@radix-ui/react-dropdown-menu": "^2.0.6",
"@radix-ui/react-slot": "^1.0.2",
"@tanstack/react-router": "^0.0.1-beta.194",
"@tanstack/router-devtools": "^0.0.1-beta.194",
"axios": "^1.5.1",
"class-variance-authority": "^0.7.0",
"clsx": "^2.0.0",
"dotenv": "^16.3.1",
"localforage": "^1.10.0",
"lucide-react": "^0.282.0",
"match-sorter": "^6.3.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"sort-by": "^0.0.2",
"tailwind-merge": "^1.14.0",
"tailwindcss-animate": "^1.0.7",
"zod": "^3.22.2"
},
"devDependencies": {
"@types/node": "^20.8.2",
"@types/react": "^18.2.15",
"@types/react-dom": "^18.2.7",
"@typescript-eslint/eslint-plugin": "^6.0.0",
"@typescript-eslint/parser": "^6.0.0",
"@vitejs/plugin-react-swc": "^3.3.2",
"autoprefixer": "^10.4.16",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.3",
"postcss": "^8.4.31",
"prettier": "3.0.3",
"tailwindcss": "^3.3.3",
"eslint": "^8.50.0",
"eslint-config-custom": "\*",
"tsconfig": "../../packages/tsconfig/vite.json",
"typescript": "^5.0.2",
"vite": "^4.4.5"
}
}

---[ADD_ESLINT]:

in fe/web/.eslintrc.cjc:

module.exports = {
root: true,
extends: ["custom"],
};

in package.json:

"eslint-config-custom": "\*",

---[ADD_TAILWIND]:

1.  in packages/taiwind-config:

create taiwind-config folder in packages folder
create package.json with:

{
"name": "tailwind-config",
"version": "0.0.0",
"private": true,
"files": ["tailwind.config.js"]
}

create taiwind.config.js with:

/** @type {import('tailwindcss').Config} \*/
export default {
darkMode: ["class"],
content: [
// packages content
"../../packages/**/_.{js, ts, jsx,tsx}",
// fe content
"src/\*\*/_.{js, ts, jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [require("tailwindcss-animate")],
};

2.  in packages/ui:
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

in taiwind.config.js add:

/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: ["./src/**/\*.{js,ts,jsx,tsx}"],
presets: [require("../tailwind-config/tailwind.config.js")],
};

in package.json add:

"devDependencies": {
"tailwind-config": "\*",
}

3.  in fe/web:
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

in package.json add:
"devDependencies": {
"tailwind-config": "\*",
}

in taiwind.config.js add:

import tailwindConfig from '../../packages/tailwind-config/tailwind.config.js';

/_ eslint-disable import/no-default-export, import/no-anonymous-default-export _/
/** @type {import('tailwindcss').Config} \*/
export default {
content: [
'./index.html',
'./src/**/_.{js,ts,jsx,tsx}',
'../../packages/ui/src/\*\*/_.{js,ts,jsx,tsx}',
],
presets: [tailwindConfig],
};

in global.css/index.css add:
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import '../../../packages/ui/src/shared-global.css';

Done!

There were some issues:
in import path in fe/web/src/index.css (wrong path to shared-global.css)
correct path is:

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import '../../../packages/ui/src/shared-global.css';

And also path issue for shared tailwind.config.js in fe/web/taiwind.config.js,
correct path is:

import tailwindConfig from '../../packages/tailwind-config/tailwind.config.js';

/_ eslint-disable import/no-default-export, import/no-anonymous-default-export _/
/** @type {import('tailwindcss').Config} \*/
export default {
content: [
'./index.html',
'./src/**/_.{js,ts,jsx,tsx}',
'../../packages/ui/src/\*\*/_.{js,ts,jsx,tsx}',
],
presets: [tailwindConfig],
};

---[ADD_SHADCN]:

1.

PS F:\Frontend\Self Edu\Projects\movieTone\packages\ui> npx shadcn-ui@latest init
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Where is your global CSS file? ... src/shared-global.css
√ Would you like to use CSS variables for colors? ... no / yes
√ Where is your tailwind.config.js located? ... ../taiwind-config/tailwind.config.js
√ Configure the import alias for components: ... src/components
√ Configure the import alias for utils: ... src/lib/utils
√ Are you using React Server Components? ... no / yes
√ Write configuration to components.json. Proceed? ... yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed.

2.

insted of using code of theme-provider we can install next-themes and import ThemeProvider and useTheme from there
<ThemeProvider attribute="class">

---[ISSUE_WITH_SHADCN_COMPONENTS]:

The problem was more likely with vite and its config and also with tsconfig.node.json
After installing vite and its packages it still didnt work but after adding tsconfig.node.json
the issue is gone. But the fun thing is that when Ive removed the vite everything are still working.

---[ISSUE_WITH_@_PATH]:

-to fix that issue you need to have baseURL and path in tsconfig (in tsconfig @\*):
{
"compilerOptions": {
"baseUrl": ".",
"paths": {
"@_": ["./src/_"]
}
},
"extends": "tsconfig/vite.json",
"include": ["."],
"exclude": ["dist", "build", "node_modules"]
}

-Also if you are using vite you need to add path property there too (in viteconfig @):

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import 'dotenv/config';

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

not only in viteconfig but also in tsconfig and in package.json (add imports:)

---[ISSUE_WITH_IMPORT_FROM_WORKSPACE]:

typical issue when vs code doesnt see packagese imported from lets say @movitone/tsconfig
The issue can be in package.json, you need to add there type:"module" and it will resolve
the problem and also resolves for some other imports that normaly should be require(commonJS)

---[ISSUE_WITH_DOCKER_ON_WINDOWS]:

In order to make docker compose work correctly we tried at first install docker UI,
but it causes the problem with docker that was installed for other project by using command line. So whenever we removed volumes with docker compose down -v it was just removed it from
second docker (UI version) so that is why we still can connect to db of other project on WSL.

Fix:

1. Remove docker UI
2. install docker with command line :

### On Windows WSL

[Setup Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

Done!
Now we can connect normaly to docker and also supertokes is running cause its using db which
was created with docker compose.

[STOP_LISTEN_PORT]

lsof -i :3000 (3000 port number)
kill -9 <PID>
