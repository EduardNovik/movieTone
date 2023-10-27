import App from './App.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import ErrorPage from './pages/Error.tsx';
import { Outlet, Router, Route, RootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Verify from './pages/login/Verify.tsx';
import './index.css';

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

const verifyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/verify',
  component: () => <Verify />,
});

const errorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <ErrorPage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  errorRoute,
  verifyRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
