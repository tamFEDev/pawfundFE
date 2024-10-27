import { Button, CardMedia, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { fontFamily, imgURL } from "../constants";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import CustomChip from "../components/CustomChip";
import { useGlobalContext } from "../GlobalProvider";

const shelterDetail = {
  name: "Happy Paws Shelter",
  location: "123 Main Street, Anytown USA",
  desc: "We are a shelter dedicated to finding loving homes for abandoned pets. Our team of volunteer animals handlers and volunteers work tirelessly to ensure that every pet finds a forever home.",
  image: imgURL.shelter,
  contactNumber: "(+84) 987837645",
  email: "happypaws@example.com",
  capacity: 50,
  ocTime: "09:00 - 17:00",
  dog: 20,
  cat: 30,
};

const AboutShelter = () => {
  const { user } = useGlobalContext();
  useEffect(() => {
    console.log(user.roleName);
  }, []);
  return (
    <div
      className=""
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        padding: "30px 30px",
        display: "inline-block",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <div
        className="pet-detail"
        style={{ display: "flex", alignItems: "center", gap: 50 }}
      >
        <CardMedia
          component={"img"}
          src={imgURL.shelter}
          sx={{ width: "500px", height: "500px", borderRadius: "10px" }}
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
              {shelterDetail.name}
            </Typography>
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
              {shelterDetail.desc}
            </Typography>
          </div>
          <PetDetailTag title={"Location"} value={shelterDetail.location} />
          <CustomDivider />
          <PetDetailTag
            title={"Contact number"}
            value={shelterDetail.contactNumber}
          />
          <CustomDivider />
          <PetDetailTag title={"Email"} value={shelterDetail.email} />
          <CustomDivider />
          <PetDetailTag
            title={"Opening / Closing"}
            value={shelterDetail.ocTime}
          />
          <CustomDivider />
          <PetDetailTag title={"Capacity"} value={shelterDetail.capacity} />
          <CustomDivider />
          <div
            className="pet-gender"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              style={{ width: "150px", paddingRight: "80px" }}
              fontFamily={fontFamily.msr}
            >
              Pet list
            </Typography>
            <div
              className=""
              style={{ display: "flex", alignItems: "center", gap: 15 }}
            >
              <CustomChip
                title={`${shelterDetail.dog} dogs`}
                color={"#FFB775"}
                bgColor={"rgb(255,183,117,0.1)"}
                fontSize={14}
                fontWeight={600}
              />
              <CustomChip
                title={`${shelterDetail.cat} cats`}
                color={"#9E896A"}
                bgColor={"rgb(158,137,106,0.1)"}
                fontSize={14}
                fontWeight={600}
              />
            </div>
          </div>
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
            // onClick={() => handleOpen()}
          >
            Edit Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutShelter;
