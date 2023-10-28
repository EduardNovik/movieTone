import './index.css';
import App from './App.tsx';
import { Home } from './pages/home';
import { About } from './pages/about';
import { ErrorPage } from './pages/404';
import { Outlet, Router, Route, RootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { VerifyLog } from './pages/login';
import { Latest } from './pages/latest';
import { Watchlist } from './pages/watchlist';

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

const latestRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/latest',
  component: () => <Latest />,
});

const watchlistRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  component: () => <Watchlist />,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <About />,
});

const verifyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/verify',
  component: () => <VerifyLog />,
});

const errorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <ErrorPage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  latestRoute,
  watchlistRoute,
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
