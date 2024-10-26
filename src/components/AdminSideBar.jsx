import { Link, Typography } from "@mui/material";
import React from "react";
import { fontFamily } from "../constants";
import CustomDivider from "./CustomDivider";
import HomeIcon from "@mui/icons-material/Home";

const pages = [
  {
    name: "About Shelter",
    url: "/dashboard/staff/about-shelter",
    icon: <HomeIcon />,
  },
  {
    name: "Shelter Pets",
    url: "/dashboard/staff/pets",
  },
  {
    name: "Adoption Forms",
    url: "/dashboard/staff/adoption-forms",
  },
  {
    name: "Events",
    url: "/dashboard/staff/events",
  },
];
const AdminSideBar = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "inline-block",
        height: "100vh",
        padding: "30px 0",
        width: "260px",
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
              href={p.url}
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
                sx={{ display: "inline-block", width: "200px" }}
                textAlign={"left"}
              >
                {p.name}
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
