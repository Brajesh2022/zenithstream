import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
import App from './App';
import { HomePage } from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import SeriesPage from '@/pages/SeriesPage';
import MoviePage from '@/pages/MoviePage';
import WatchPage from '@/pages/WatchPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search/:query", element: <SearchPage /> },
      { path: "series/:id", element: <SeriesPage /> },
      { path: "movie/:id", element: <MoviePage /> },
      { path: "watch/:id", element: <WatchPage /> },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);