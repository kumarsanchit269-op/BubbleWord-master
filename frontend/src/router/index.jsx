import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Reading } from '../pages/Reading';
import { Report } from '../pages/Report';
import { NotFound } from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/reading',
    element: <Reading />,
  },
  {
    path: '/report',
    element: <Report />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
