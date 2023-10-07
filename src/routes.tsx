import App from './App.tsx';
import Home from '@/pages/Home.tsx';
import About from './pages/About.tsx';
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

// function Root() {
//   return (
//     <App>
//       <Outlet />
//       <TanStackRouterDevtools />
//     </App>
//   );
// }

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Home />,
});

// function HomeFunc() {
//   return <Home />;
// }

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <About />,
});

// function AboutFunc() {
//   return <div>Hello from About!</div>;
// }

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
