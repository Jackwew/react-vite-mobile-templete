import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/index.tsx";
import ErrorPage from "../pages/errorPage";
import Test from "@/pages/test";
import Contact from "@/pages/contact";

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
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

export default router;
