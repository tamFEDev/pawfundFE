import { Link, Typography } from "@mui/material";
import React from "react";
import { fontFamily } from "../constants";
import CustomDivider from "./CustomDivider";
import HomeIcon from "@mui/icons-material/Home";
import { useGlobalContext } from "../GlobalProvider";
import { Link as RouterLink } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const staffPages = [
  {
    name: "About Shelter",
    url: "/dashboard/staff/about-shelter",
    icon: <HomeIcon />,
  },
  {
    name: "Shelter Pets",
    url: "/dashboard/staff/pets",
    icon: <PetsIcon />,
  },
  {
    name: "Adoption Forms",
    url: "/dashboard/staff/adoption-forms",
    icon: <EditNoteIcon />,
  },
  {
    name: "Donations",
    url: "/dashboard/staff/donations",
    icon: <VolunteerActivismIcon />,
  },
];

const managerPages = [
  {
    name: "Pet Management",
    url: "/dashboard/manager/pet-management",
    icon: <PetsIcon />,
  },
  {
    name: "User Management",
    url: "/dashboard/manager/user-management",
    icon: <EventIcon />,
  },
];

const AdminSideBar = () => {
  const { user } = useGlobalContext();

  // Display loading or error if user data is not available
  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const pages = user.roleId === 4 ? staffPages : managerPages;

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "inline-block",
        height: "100vh",
        padding: "40px 20px",
        width: user.roleId === 4 ? "180px" : "190px",
        marginTop: "80px",
        position: "fixed",
      }}
    >
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pages.map((p, index) => (
          <div className="" key={index}>
            <Link
              component={RouterLink} // Use RouterLink here
              to={p.url} // Navigate with 'to' instead of 'href'
              underline="none"
              className=""
              sx={{ width: "100%" }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                fontWeight={600}
                fontFamily={fontFamily.msr}
                sx={{ display: "flex", gap: 1, width: "200px" }}
                // textAlign={"center"}
              >
                {p.icon} {p.name}
              </Typography>
            </Link>
            <CustomDivider padding={"30px 0"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
