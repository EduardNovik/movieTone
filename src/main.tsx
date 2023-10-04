import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from '@/pages/Error.tsx';
import Spacecraft from './pages/Spacecraft.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    // children: [
    //   {
    //     path: 'contacts/:contactId',
    //     element: <Contact />,
    //   },
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
