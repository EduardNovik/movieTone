import './index.css';
import App from './App.tsx';
import { Home } from './pages/home';
import { About } from './pages/about';
import { ErrorPage } from './pages/404';
import {
  Outlet,
  Router,
  Route,
  RootRoute,
  useParams,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Auth } from './pages/auth';
import { Latest } from './pages/latest';
import { Watchlist } from './pages/watchlist';
import { Title } from './pages/title';
import { User } from './pages/user';
import { Signup } from './pages/signup';
import { WatchlistDetails } from './pages/watchlist/watchlistDetails/watchlistDetails.tsx';

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const { pathname } = window.location;
    return pathname === '/' ? (
      <App>
        <Home />
        <TanStackRouterDevtools />
      </App>
    ) : (
      <App>
        <Outlet />
        <TanStackRouterDevtools />
      </App>
    );
  },
});

const latestRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/latest',
  component: () => <Latest />,
});

const watchlistRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/watchlist',
  component: () => <Watchlist />,
});

const titlesInWatchlistRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/watchlist/$id',
  component: () => <WatchlistDetails />,
});

const aboutRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/about',
  component: () => <About />,
});

const titleRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/title/$id',
  component: () => {
    const { id } = useParams({ from: titleRoute.id });
    return <Title id={id} />;
  },
});

const userRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/user',
  component: () => <User />,
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
  component: () => <Signup />,
});

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([
    latestRoute,
    watchlistRoute.addChildren([titlesInWatchlistRoute]),
    aboutRoute,
    titleRoute,
    userRoute,
  ]),
  errorRoute,
  authRoute,
  signupRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
