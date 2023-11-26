import React from 'react';
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Layout from './components/Layout';
import LayoutWithoutNav from './components/LayoutWithoutNav';
import GroceryList from './pages/GroceryList';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/groceries",
        element: <GroceryList />
      },
    ]
  },
  {
    element: <LayoutWithoutNav />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
    ]
  }  
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
