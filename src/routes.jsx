import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import Payments from "./pages/Payments";
import Access from "./pages/Access";
import Login from "./pages/Login";
import { NotFoundPage } from "./pages/404Page";
import EventDetails from "./pages/EventDetails";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/event/:id", // <-- Add this new route
        element: <EventDetails />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/access",
        element: <Access />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
