import './index.css';
import App from './App.tsx';
import { Home } from './pages/home';
import { About } from './pages/about';
import { ErrorPage } from './pages/404';
import { Outlet, Router, Route, RootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Auth } from './pages/auth/index.ts';
import { Latest } from './pages/latest';
import { Watchlist } from './pages/watchlist';
import RegisterModal from './components/modals/RegisterModal';

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

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/verify',
  component: () => <Auth />,
});

const errorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <ErrorPage />,
});

const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: () => <RegisterModal />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  latestRoute,
  watchlistRoute,
  aboutRoute,
  errorRoute,
  authRoute,
  signupRoute,
]);

// const routeTree = rootRoute.addChildren([
//   homeRoute,
//   latestRoute,
//   watchlistRoute,
//   aboutRoute,
//   errorRoute,
//   authRoute.addChildren([signupRoute]),
// ]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
