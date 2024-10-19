import { Button, CardMedia, Typography } from "@mui/material";
import Header from "../components/Header";
import { fontFamily, imgURL } from "../constants";
import CustomChip from "../components/CustomChip";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import PetList from "../components/PetList";
import AdoptionBanner from "../components/AdoptionBanner";
import Footer from "../components/Footer";

const petDetail = {
  name: "Shibe milo",
  animal: "dog",
  breed: "Shiba inu",
  age: "2 years old",
  medicalCondition: "Vaccinated",
  publishDate: "12-Oct-2022",
  size: "small",
  color: "black",
  shelterLocation: "Hanoi, Vietnam",
  shelterName: "Trại thú cưng ABC - TP. Hồ Chí Minh",
  gender: "Male",
  desc: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. Hes great with kids and other dogs, making him the perfect addition to an active family. Buddy is fully vaccinated and house-trained.",
};

const PetDetail = () => {
  return (
    <div>
      <Header />
      <div
        className=""
        style={{
          marginTop: "70px",
          padding: "0 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="pet-detail"
          style={{ display: "flex", alignItems: "center", gap: 50 }}
        >
          <CardMedia
            component={"img"}
            src={imgURL.shiba}
            sx={{ width: "630px", borderRadius: "10px" }}
          />
          <div className="pet-desc" style={{ width: "600px" }}>
            <div
              className="name-type"
              style={{ display: "flex", alignItems: "center", gap: 30 }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={32}
                fontWeight={700}
                fontFamily={fontFamily.msr}
              >
                {petDetail.name}
              </Typography>
              <CustomChip
                title={`dog`}
                color={"#FFB775"}
                bgColor={"rgb(255,183,117,0.1)"}
                fontSize={14}
                fontWeight={600}
              />
              <CustomChip
                title={petDetail.breed}
                color={"#FFB775"}
                bgColor={"rgb(255,183,117,0.1)"}
                fontSize={14}
                fontWeight={600}
              />
            </div>
            <div
              className="pet-desc"
              style={{ marginTop: "10px", marginBottom: "25px" }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontFamily={fontFamily.msr}
              >
                {petDetail.desc}
              </Typography>
            </div>
            <PetDetailTag title={"Gender"} value={petDetail.gender} />
            <CustomDivider />
            <PetDetailTag title={"Age"} value={petDetail.age} />
            <CustomDivider />
            <PetDetailTag title={"Size"} value={petDetail.size} />
            <CustomDivider />
            <PetDetailTag title={"Color"} value={petDetail.color} />
            <CustomDivider />
            <PetDetailTag
              title={"Medical condition"}
              value={petDetail.medicalCondition}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Location"}
              value={petDetail.shelterLocation}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Publish date"}
              value={petDetail.publishDate}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Shelter name"}
              value={petDetail.shelterName}
            />
            <Button
              sx={{
                bgcolor: "#003459",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
                fontFamily: fontFamily.msr,
                textTransform: "none",
                borderRadius: "20px",
                width: "100%",
                py: "12px",
                marginTop: "40px",
              }}
            >
              Adopt {petDetail.name} now
            </Button>
          </div>
        </div>
      </div>
      <div
        className="other-pets"
        style={{ paddingLeft: "60px", marginTop: "60px" }}
      >
        <Typography
          variant="body1"
          color="#103559"
          fontFamily={"Montserrat"}
          sx={{}}
          fontSize={16}
        >
          Other Pets You Might Love
        </Typography>

        <Typography
          variant="body1"
          color="#103559"
          fontFamily={"Montserrat"}
          sx={{ mt: "5px" }}
          fontSize={24}
          fontWeight={600}
        >
          Discover more pets waiting for a loving home!
        </Typography>
      </div>
      <PetList amount={4} />
      <AdoptionBanner mt={"60px"} />
      <Footer mt={"100px"} />
    </div>
  );
};

export default PetDetail;
