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
    name: "Events",
    url: "/dashboard/staff/events",
    icon: <EventIcon />,
  },
];

const managerPages = [
  {
    name: "Pet list",
    url: "/dashboard/manager/pet-list",
    icon: <PetsIcon />,
  },
  {
    name: "Events",
    url: "/dashboard/manager/pet-list",
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
        padding: "30px 0",
        width: "260px",
        marginTop: "80px",
        position: "fixed",
      }}
    >
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
                sx={{ display: "flex", gap: 2, width: "200px" }}
                textAlign={"left"}
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
