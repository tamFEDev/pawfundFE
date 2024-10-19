import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import { fontFamily } from "../constants";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PetList from "../components/PetList";
import AdoptionBanner from "../components/AdoptionBanner";
import Footer from "../components/Footer";

const Adoption = () => {
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
          Find Your Perfect Companion Today
        </Typography>
        <Typography
          variant="body1"
          color="#103559"
          fontSize={24}
          fontFamily={fontFamily.msr}
          fontWeight={700}
          textAlign={"center"}
        >
          Join us in transforming the lives of abandoned pets.
        </Typography>
      </div>
      <div
        className="search"
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <OutlinedInput
          id=""
          label=""
          placeholder="Find your favorite pets"
          sx={{ borderRadius: "15px", width: "800px" }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <Button
          sx={{
            py: "12px",
            fontSize: 16,
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "#103559",
            color: "white",
            borderRadius: "15px",
            marginLeft: "20px",
            width: "195px",
          }}
        >
          Find pets
        </Button>
      </div>
      <PetList mb={"60px"} />
      <AdoptionBanner />
      <Footer mt={"100px"} />
    </div>
  );
};

export default Adoption;
