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

but I've decidet to use tanstack router

- npm install @tanstack/react-router@beta
