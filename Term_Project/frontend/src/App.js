import React from 'react';
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Layout from './components/Layout';
import GroceryList from './pages/GroceryList';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        // Change this path back to the Admin page
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/groceries",
        element: <GroceryList />
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
