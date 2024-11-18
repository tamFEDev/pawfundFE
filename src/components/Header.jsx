import {
  Box,
  Button,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { fontFamily, imgURL } from "../constants";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGlobalContext } from "../GlobalProvider";
import { useEffect } from "react";
import CustomChip from "./CustomChip";

const pages = [
  { title: "Home", url: "/home" },
  { title: "Donation", url: "/donation" },
  { title: "Adoption", url: "/adoption" },
  // { title: "Volunteer", url: "/volunteer" },
  { title: "Shelters", url: "/shelters" },
  // { title: "Contact us", url: "/contact-us" },
];

const Header = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 60px",
        marginTop: "30px",
      }}
    >
      <div className="left" style={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component={"img"}
          src={imgURL.logo}
          sx={{ width: "179px" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "85px",
            gap: 7,
          }}
        >
          {pages.map((item, index) => (
            <Link
              key={index}
              sx={{ textDecoration: "none", cursor: "pointer" }}
              href={item.url}
            >
              <Typography
                variant="body1"
                color="#103559"
                fontWeight={700}
                fontFamily={"Montserrat"}
              >
                {item.title}
              </Typography>
            </Link>
          ))}
        </Box>
      </div>

      {user ? (
        <Typography
          variant="body1"
          color="initial"
          fontFamily={fontFamily.msr}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Welcome pet lover,{" "}
          <Typography
            variant="body1"
            color="initial"
            fontWeight={600}
            fontFamily={fontFamily.msr}
          >
            {user?.email}
          </Typography>
          <CustomChip
            title={user.isApprovedUser ? "Verified" : "Unverified"}
            color={
              user.isApprovedUser ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"
            }
            bgColor={
              user.isApprovedUser
                ? "rgb(22, 163, 74, 0.1)"
                : "rgb(217, 119, 6, 0.1)"
            }
            fontSize={12}
            fontWeight={600}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/account/profile")}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </div>
        </Typography>
      ) : (
        <Button
          sx={{
            p: "15px 35px",
            textTransform: "none",
            bgcolor: "#103559",
            fontWeight: 600,
            color: "white",
            borderRadius: "25px",
            fontFamily: "Montserrat",
          }}
          onClick={() => navigate("/login")}
        >
          Login / Register
        </Button>
      )}
    </div>
  );
};

export default Header;
