import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Button, Card, CardMedia, Link, List, Typography } from "@mui/material";
import { fontFamily } from "../constants";
import CustomDivider from "../components/CustomDivider";
import { useGlobalContext } from "../GlobalProvider";

const tabs = [
  {
    name: "My Profile",
    url: "/account/profile",
  },
  {
    name: "My Pets",
    url: "/account/profile",
  },
  {
    name: "My Adoption Forms",
    url: "/account/my-forms",
  },
  {
    name: "Upload Pets",
    url: "/account/upload-pet",
  },
];

const AccountLayout = () => {
  const { logout, loading } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div
        className="body"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 100px",
          marginTop: "50px",
          gap: 50,
        }}
      >
        <Card sx={{ width: "280px", p: "30px 30px", height: "350px" }}>
          <div className="">
            {tabs.map((t, index) => (
              <Link href={t.url} underline="none" key={index}>
                <Typography
                  variant="body1"
                  color="initial"
                  key={index}
                  fontSize={18}
                  fontFamily={fontFamily.msr}
                >
                  {t.name}
                </Typography>
                <CustomDivider padding={"20px 0"} />
              </Link>
            ))}
            <Button onClick={() => handleLogout()}>
              <Typography
                variant="body1"
                color="initial"
                fontSize={18}
                fontFamily={fontFamily.msr}
                fontWeight={600}
                sx={{ marginTop: "20px", cursor: "pointer" }}
              >
                Log out
              </Typography>
            </Button>
          </div>
        </Card>
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
