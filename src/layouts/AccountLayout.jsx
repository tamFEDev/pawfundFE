import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  Link,
  List,
  Snackbar,
  Typography,
} from "@mui/material";
import { fontFamily } from "../constants";
import CustomDivider from "../components/CustomDivider";
import { useGlobalContext } from "../GlobalProvider";
import CustomChip from "../components/CustomChip";

const tabs = [
  {
    name: "My Profile",
    url: "/account/profile",
  },

  {
    name: "My Adoption Forms",
    url: "/account/my-forms",
  },
  {
    name: "My Donations",
    url: "/account/my-donations",
  },
];

const AccountLayout = () => {
  const { logout, loading, user } = useGlobalContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = (name, url) => {
    navigate(url);
  };

  return (
    <div>
      <Snackbar
        open={open} // Use 'alert' state to control visibility
        autoHideDuration={2000} // Automatically closes after 3 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="error" // Corrected spelling of "success"
          sx={{ width: "100%" }}
        >
          Please update all fields in My Profile tab
        </Alert>
      </Snackbar>
      <Header />
      <div
        className="body"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 50px",
          marginTop: "50px",
          gap: 20,
        }}
      >
        <Card sx={{ width: "290px", p: "30px 30px", height: "350px" }}>
          <div className="">
            <div className="" style={{}}>
              {tabs.map((t, index) => (
                <div
                  onClick={() => handleNavigate(t.name, t.url)}
                  key={index}
                  style={{ cursor: "pointer" }}
                >
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
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleLogout()}
              sx={{ marginTop: "20px", textTransform: "none" }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={18}
                fontFamily={fontFamily.msr}
                fontWeight={600}
                sx={{ cursor: "pointer" }}
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
