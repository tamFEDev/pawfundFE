import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { fontFamily } from "../constants";
import Footer from "../components/Footer";
import ShelterList from "../components/ShelterList";
import DonationBanner from "../components/DonationBanner";
import { useEffect } from "react";

const Donation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Header />
      <div className="title" style={{ marginTop: "50px" }}>
        <Typography
          variant="body1"
          color="#103559"
          fontSize={16}
          fontFamily={fontFamily.msr}
          textAlign={"center"}
        >
          Support a Shelter and Change Lives
        </Typography>
        <Typography
          variant="body1"
          color="#103559"
          fontSize={24}
          fontFamily={fontFamily.msr}
          fontWeight={700}
          textAlign={"center"}
        >
          Discover shelters in need of your support and make a difference in the
          lives of abandoned animals.
        </Typography>
      </div>
      <div className="" style={{ padding: "0 60px" }}>
        <ShelterList mb={"60px"} />
      </div>
      <DonationBanner />
      <Footer mt={"100px"} />
    </div>
  );
};

export default Donation;
