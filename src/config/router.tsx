import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/index.tsx";
import ErrorPage from "../pages/errorPage";
import Test from "@/pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;
