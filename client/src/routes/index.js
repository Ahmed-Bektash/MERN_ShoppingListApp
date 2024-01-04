import Login from "../layout/Login";
import MainPage from "../layout/MainPage";
import Dashboard from "../layout/Dashboard";
import Signup from "../layout/Signup";
import ErrorPage from "../layout/ErrorPage";
import {createBrowserRouter } from "react-router-dom";
import ShoppingList from '.././components/ShoppingList'
import PasswordReset from "../layout/PasswordReset";

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
      path: "/passwordreset/:resetToken",
      element: <PasswordReset />,
      errorElement: <ErrorPage />,
      title: "Reset Password",
      needsAuth: true,
    },
    {
      path: "/user",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      title: "Dashboard",
      needsAuth: true,
      children:[ // use <Outlet /> in the parent component in order to render these children
        {
          path: "/user/lists/:category/:id",
          element: <ShoppingList />,
          errorElement: <ErrorPage />,
          title: "Your List",
          needsAuth: true,
        },
      ]
    },
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
      title: "Home",
      needsAuth: false,
    },
  ]);
