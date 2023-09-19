import { createBrowserRouter } from "react-router-dom";
import Home, { loader as homeLoader } from "../pages/home/index.tsx";
import ErrorPage from "../pages/errorPage";
import Chat, { loader as chatLoader } from "@/pages/chat";
import Contact from "@/pages/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "chat/:chatId",
    loader: chatLoader,
    element: <Chat />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

export default router;
