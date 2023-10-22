import App from './App.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import ErrorPage from './pages/Error.tsx';
import './index.css';
import { Outlet, Router, Route, RootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const rootRoute = new RootRoute({
  component: () => (
    <App>
      <Outlet />
      <TanStackRouterDevtools />
    </App>
  ),
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Home />,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <About />,
});

// const loginRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: '/login',
//   component: () => <Home />,
// });

// const registerRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: '/register',
//   component: () => <Home />,
// });

const errorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <ErrorPage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  errorRoute,
  // loginRoute,
  // registerRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
