import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './features/App/App';
import Login from './features/Login/Login';
import Register from './features/Register/Register';
import { DateRangeProvider } from './contexts/DateRangeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DateRangeProvider>
      <RouterProvider router={router} />
    </DateRangeProvider>
  </React.StrictMode>
);
