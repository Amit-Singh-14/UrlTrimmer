import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/DashBoard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import Required_Auth from "./components/Required_Auth";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: (
            <Required_Auth>
              <DashBoard />
            </Required_Auth>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: (
            <Required_Auth>
              <Link />
            </Required_Auth>
          ),
        },
        {
          path: "/:id",
          element: <RedirectLink />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
