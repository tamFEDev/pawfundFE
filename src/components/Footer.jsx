import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Card, CardMedia, Link } from "@mui/material";
import { fontFamily, imgURL } from "../constants";

const links = [
  {
    name: "Home",
    icon: imgURL.fb,
  },
  { name: "Category", icon: imgURL.x },
  { name: "About", icon: imgURL.ins },
  { name: "Contact", icon: imgURL.ytb },
];

const Footer = ({ mt }) => {
  const [username, setUsername] = useState("");
  return (
    <div
      className="footer-container"
      style={{
        backgroundColor: "#FCEED5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 130px",
        marginTop: "100px",
      }}
    >
      <div
        className="form-box"
        style={{
          padding: "32px ",
          backgroundColor: "#003459",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 50,
        }}
      >
        <div className="left">
          <Typography
            variant="body1"
            color="white"
            fontFamily={fontFamily.msr}
            fontSize={24}
            fontWeight={600}
          >
            Register Now So You Don&apos;t Miss
          </Typography>
          <Typography
            variant="body1"
            color="white"
            fontFamily={fontFamily.msr}
            fontSize={24}
            fontWeight={600}
          >
            Our Program
          </Typography>
        </div>
        <div
          className="right"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "12px",
            backgroundColor: "white",
            borderRadius: "14px",
          }}
        >
          <TextField
            id=""
            label="Email"
            placeholder="Enter your email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "500px" }}
          />
          <Button
            sx={{
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#003459",
              color: "white",
              fontFamily: fontFamily.msr,
              p: "15px 30px",
            }}
          >
            Subscribe now
          </Button>
        </div>
      </div>
      <div
        className="icon-and-links"
        style={{
          display: "flex",
          gap: 50,
          marginTop: "40px",
          width: "1230px",
          justifyContent: "space-between",
        }}
      >
        <div className="left" style={{ display: "flex", gap: 70 }}>
          {links.map((l, index) => (
            <Link
              key={index}
              sx={{ textDecoration: "none", cursor: "pointer" }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                fontFamily={fontFamily.msr}
              >
                {l.name}
              </Typography>
            </Link>
          ))}
        </div>
        <div className="right" style={{ display: "flex", gap: 70 }}>
          {links.map((l, index) => (
            <CardMedia
              component={"img"}
              src={l.icon}
              key={index}
              sx={{ width: "24px", height: "24px" }}
            />
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <CardMedia
        component={"img"}
        src={imgURL.logo}
        sx={{ width: "115px", marginTop: "30px" }}
      />
    </div>
  );
};

export default Footer;
