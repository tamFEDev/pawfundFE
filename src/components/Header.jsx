import { Box, Button, CardMedia, Link, Typography } from "@mui/material";
import { imgURL } from "../constants";

const pages = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Donation",
    url: "/donation",
  },
  {
    title: "Adoption",
    url: "/adoption",
  },
  {
    title: "Volunteer",
    url: "/volunteer",
  },
  {
    title: "Shelters",
    url: "/shelters",
  },
  {
    title: "Contact us",
    url: "/contact-us",
  },
];

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 88px",
        marginTop: "50px",
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
      >
        Login / Register
      </Button>
    </div>
  );
};

export default Header;
