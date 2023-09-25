import Login from "../layout/Login";
import MainPage from "../layout/MainPage";
import Signup from "../layout/Signup";
import ErrorPage from "../layout/ErrorPage";
import {createBrowserRouter } from "react-router-dom";
import ShoppingList from '.././components/ShoppingList'

export const router = createBrowserRouter([
    {
      path: "/register",
      element: <Signup />,
      errorElement: <ErrorPage />,
      title: "Register",
      needsAuth: false,
    },
  
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
      title: "Login",
      needsAuth: false,
    },
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
      title: "Home",
      needsAuth: true,
      children:[ // use <Outlet /> in the parent component in order to render these children
    // {
    //     path: "/user/:id",
    //     element: <User />,
    //     errorElement: <ErrorPage />,
    //     title: "Dashboard",
    //     needsAuth: true,
    //   },
      {
        path: "/lists/:category/:id",
        element: <ShoppingList />,
        errorElement: <ErrorPage />,
        title: "Shopping List",
        needsAuth: true,
      },
      ]
    },
  ]);
