import { Button, CardMedia, Typography } from "@mui/material";
import { fontFamily, imgURL } from "../constants";

const AdoptionBanner = ({ mt }) => {
  return (
    <div
      className="banner-section1"
      style={{ padding: "0 60px", position: "relative", marginTop: mt }}
    >
      <CardMedia
        component={"img"}
        src={imgURL.banner}
        sx={{ width: "1400px" }}
      />
      <div
        className="banner1-content"
        style={{ position: "absolute", top: 64, left: 185 }}
      >
        <div
          className=""
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Typography
            variant="body1"
            color="#003459"
            fontSize={52}
            fontWeight={700}
            fontFamily={fontFamily.msr}
          >
            Adoption
          </Typography>
          <CardMedia
            component={"img"}
            src={imgURL.pawLogo}
            sx={{ width: "42px" }}
          />
        </div>
        <Typography
          variant="body1"
          color="#003459"
          fontFamily={fontFamily.msr}
          fontSize={36}
          fontWeight={600}
        >
          We need help. So do they.
        </Typography>
        <Typography
          variant="body1"
          color="#003459"
          fontFamily={fontFamily.msr}
          sx={{ mt: "20px" }}
        >
          Adopt a pet and give it a home,
          <br />
          it will be love you back unconditionally.
        </Typography>
        <Button
          sx={{
            py: "15px",
            bgcolor: "#003459",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            color: "white",
            borderRadius: "25px",
            textTransform: "none",
            width: "250px",
            mt: "40px",
          }}
        >
          Adopt now
        </Button>
      </div>
    </div>
  );
};

export default AdoptionBanner;
