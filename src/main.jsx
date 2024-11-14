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
import MyProfile from "./pages/MyProfile.jsx";
import AccountLayout from "./layouts/AccountLayout.jsx";
import MyForms from "./pages/MyForms.jsx";
import UploadPets from "./pages/UploadPets.jsx";
// import { Dashboard } from "@mui/icons-material";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import GlobalProvider from "./GlobalProvider.jsx";
import AboutShelter from "./pages/AboutShelter.jsx";
import ShelterPet from "./pages/ShelterPet.jsx";
import AdoptionForms from "./pages/AdoptionForms.jsx";
import MyPet from "./pages/MyPet.jsx";
import ManagePets from "./pages/ManagePets.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PetManagement from "./pages/PetManagement.jsx";
import UserManagement from "./pages/UserManagement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/donation",
    element: (
      <ProtectedRoute>
        <Donation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adoption",
    element: (
      <ProtectedRoute>
        <Adoption />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shelters",
    element: (
      <ProtectedRoute>
        <Shelters />
      </ProtectedRoute>
    ),
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
    path: "/adoption/:id",
    element: (
      <ProtectedRoute>
        <PetDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shelters/:id",
    element: (
      <ProtectedRoute>
        <ShelterDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/account/profile",
        element: <MyProfile />,
      },
      {
        path: "/account/my-pets",
        element: <MyPet />,
      },
      {
        path: "/account/my-forms",
        element: <MyForms />,
      },
      {
        path: "/account/my-forms/:id",
        element: <MyProfile />,
      },
      {
        path: "/account/upload-pet",
        element: <UploadPets />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/staff/about-shelter",
        element: <AboutShelter />,
      },
      {
        path: "/dashboard/staff/pets",
        element: <ShelterPet />,
      },
      {
        path: "/dashboard/staff/pets/:id",
        element: <AboutShelter />,
      },
      {
        path: "/dashboard/staff/adoption-forms",
        element: <AdoptionForms />,
      },
      {
        path: "/dashboard/staff/adoption-forms/:id",
        element: <AboutShelter />,
      },
      {
        path: "/dashboard/staff/events",
        element: <AboutShelter />,
      },
      {
        path: "/dashboard/manager/pet-management",
        element: <ManagePets />,
      },
      {
        path: "/dashboard/manager/user-management",
        element: <UserManagement />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </StrictMode>
);
