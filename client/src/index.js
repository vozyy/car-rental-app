import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './features/App/App';
import LoginForm from './components/Login/LoginForm';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/login',
    element: <LoginForm />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
