import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import Payments from "./pages/Payments";
import Access from "./pages/Access";
import Login from "./pages/Login";

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
]);

export default router;
