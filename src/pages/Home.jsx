import Header from "../components/Header";
import { Button, CardMedia, Typography } from "@mui/material";
import { imgURL } from "../constants";
import AdoptionBanner from "../components/AdoptionBanner";
import DonationBanner from "../components/DonationBanner";
import Footer from "../components/Footer";
import ShelterList from "../components/ShelterList";
import PetList from "../components/PetList";
import { useGlobalContext } from "../GlobalProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user, isLogged } = useGlobalContext();
  const navigate = useNavigate();
  // const userInfo = localStorage.getItem('user')
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    } else {
      if (user?.roleId && isLogged) {
        switch (user.roleId) {
          case 4:
            navigate("/dashboard/staff/about-shelter");
            break;
          case 2:
            navigate("/");
            break;
          case 3:
            navigate("/dashboard/manager/pet-management");
            break;
        }
      }
    }
    console.log(user.roleId);
  }, [user, isLogged, navigate]); // Depend on user, isLogged, and navigate

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="hero-section">
        <Header />
        <div
          className="hero-text"
          style={{ marginTop: "100px", marginLeft: "88px" }}
        >
          <Typography
            variant="body1"
            color="#103559"
            fontSize={60}
            fontWeight={700}
            fontFamily={"Montserrat"}
          >
            Find a Furry Friend
          </Typography>
          <Typography
            variant="body1"
            color="#103559"
            fontSize={46}
            fontWeight={600}
            fontFamily={"Montserrat"}
          >
            Make a Lifetime Bond!
          </Typography>
          <Typography
            variant="body1"
            color="#103559"
            sx={{ marginTop: "20px", width: "600px" }}
            fontSize={24}
            fontFamily={"Montserrat"}
          >
            Bringing a pet into your life means more love, laughter, and joy.
            With over 200+ pets waiting for a home, find your perfect companion
            today!
          </Typography>
          <Button
            sx={{
              bgcolor: "#103559",
              fontWeight: 600,
              borderRadius: 25,
              textTransform: "none",
              color: "white",
              p: "15px 35px",
              marginTop: "40px",
              width: "274px",
              fontFamily: "Montserrat",
            }}
          >
            Explore now
          </Button>
        </div>
        <CardMedia
          component={"img"}
          src={imgURL.hero}
          sx={{ width: "100%", position: "absolute", top: 0, zIndex: -1 }}
        />
      </div>
      <div
        className="pet-section"
        style={{ marginTop: "240px", marginBottom: "60px" }}
      >
        <div
          className="pet-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 60px",
          }}
        >
          <div className="left">
            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{}}
              fontSize={16}
            >
              Find Your Perfect Companion Today
            </Typography>

            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{ mt: "5px" }}
              fontSize={24}
              fontWeight={600}
            >
              Join us in transforming the lives of abandoned pets
            </Typography>
          </div>
          <Button
            sx={{
              p: "15px 35px",
              border: "2px solid #103559",
              color: "#103559",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Montserrat",
              borderRadius: "25px",
            }}
          >
            View more
          </Button>
        </div>
        <PetList />
      </div>
      <AdoptionBanner />
      <div
        className="shelter-section"
        style={{ padding: "0 60px", marginTop: "60px", marginBottom: "60px" }}
      >
        <div
          className="shelter-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="left">
            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{}}
              fontSize={16}
            >
              Find a Safe Haven for Pets
            </Typography>

            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{ mt: "5px" }}
              fontSize={24}
              fontWeight={600}
            >
              Explore shelters near you and help transform the lives of
              abandoned animals.
            </Typography>
          </div>
          <Button
            sx={{
              p: "15px 35px",
              border: "2px solid #103559",
              color: "#103559",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Montserrat",
              borderRadius: "25px",
            }}
          >
            View more
          </Button>
        </div>
        <ShelterList />
      </div>
      <DonationBanner />
      <Footer mt={"100px"} />
    </div>
  );
};

export default Home;
