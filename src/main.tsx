import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router';

const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <hr />
      <Outlet />
    </div>
  );
}

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return <App />;
}

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

function About() {
  return <div>Hello from About!</div>;
}

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render our app!
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
