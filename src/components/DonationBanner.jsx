import { Button, CardMedia, Typography } from "@mui/material";
import { fontFamily, imgURL } from "../constants";

const DonationBanner = () => {
  return (
    <div
      className="banner-section1"
      style={{ padding: "0 60px", position: "relative" }}
    >
      <CardMedia
        component={"img"}
        src={imgURL.Banner2}
        sx={{ width: "1400px" }}
      />
      <div
        className="banner1-content"
        style={{ position: "absolute", top: 64, left: 845 }}
      >
        <div
          className=""
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Typography
            variant="body1"
            color="white"
            fontSize={52}
            fontWeight={700}
            textAlign={"right"}
            fontFamily={fontFamily.msr}
          >
            Give Hope
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="white"
          fontFamily={fontFamily.msr}
          fontSize={36}
          fontWeight={600}
        >
          One Penny at a Time
        </Typography>
        <Typography
          variant="body1"
          color="white"
          fontFamily={fontFamily.msr}
          sx={{ mt: "20px" }}
        >
          Your small donation can make a big difference.
          <br />
          Help provide shelter, care, and love to pets in need. Every penny
          counts
        </Typography>
        <Button
          sx={{
            py: "15px",
            color: "#003459",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            bgcolor: "white",
            borderRadius: "25px",
            textTransform: "none",
            width: "250px",
            mt: "40px",
          }}
        >
          Donate now
        </Button>
      </div>
    </div>
  );
};

export default DonationBanner;
