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
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import GlobalProvider from "./GlobalProvider.jsx";
import AboutShelter from "./pages/AboutShelter.jsx";
import ShelterPet from "./pages/ShelterPet.jsx";
import AdoptionForms from "./pages/AdoptionForms.jsx";
import MyPet from "./pages/MyPet.jsx";
import ManagePets from "./pages/ManagePets.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import DonationSuccess from "./pages/DonationSuccess.jsx";
import DonationList from "./pages/DonationList.jsx";
import MyDonations from "./pages/MyDonations.jsx";

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
    path: "/adoption/:id",
    element: <PetDetail />,
  },
  {
    path: "/shelters/:id",
    element: <ShelterDetail />,
  },
  {
    path: "/shelters/donation-success",
    element: (
      <ProtectedRoute>
        <DonationSuccess />
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
      {
        path: "/account/my-donations",
        element: <MyDonations />,
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
      {
        path: "/dashboard/manager/user-management",
        element: <UserManagement />,
      },
      {
        path: "/dashboard/staff/donations",
        element: <DonationList />,
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
