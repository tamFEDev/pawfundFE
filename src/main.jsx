import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Donation from "./pages/Donation.jsx";
import Adoption from "./pages/Adoption.jsx";
import Shelters from "./pages/Shelters.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PetDetail from "./pages/PetDetail.jsx";
import ShelterDetail from "./pages/ShelterDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/donation",
    element: <Donation />,
  },
  {
    path: "/adoption",
    element: <Adoption />,
  },
  {
    path: "/shelters",
    element: <Shelters />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/adoption/id",
    element: <PetDetail />,
  },
  {
    path: "/shelters/id",
    element: <ShelterDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
