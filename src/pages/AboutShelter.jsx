import { Box, Button, CardMedia, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import CustomChip from "../components/CustomChip";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  //   overflowY: "scroll",
};

const AboutShelter = () => {
  const { user } = useGlobalContext();
  const [detail, setDetail] = useState({});

  const fetchShelterDetail = async (shelterId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Shelter/GetInformationShelter/${shelterId}`
      );
      setDetail(res.data);
    } catch (err) {
      console.log(err);
    }
    console.log(detail);
  };

  useEffect(() => {
    console.log(user.userId);
  }, []);

  useEffect(() => {
    const fetchShelterID = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/staff/getShelterId?staffId=${user.userId}`
        );
        const shelterId = res.data.shelterId;
        console.log(shelterId);
        fetchShelterDetail(shelterId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShelterID();
  }, []);

  // Function to fetch shelter details

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
        width: "1230px",
        height: "546px",
      }}
    >
      <div
        className="pet-detail"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 50,
          padding: "6px  0",
        }}
      >
        <CardMedia
          component={"img"}
          src={detail.shelterImage}
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
              {detail.shelterName}
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
              {detail.description}
            </Typography>
          </div>
          <PetDetailTag title={"Location"} value={shelterDetail.location} />
          <CustomDivider />
          <PetDetailTag title={"Contact number"} value={detail.contact} />
          <CustomDivider />
          <PetDetailTag title={"Email"} value={shelterDetail.email} />
          <CustomDivider />
          <PetDetailTag
            title={"Opening / Closing"}
            value={detail.openingClosing}
          />
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
              style={{ width: "150px", paddingRight: "50px" }}
              fontFamily={fontFamily.msr}
            >
              Current Capacity
            </Typography>
            {/* <div
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
            </div> */}
            <Typography
              variant="body1"
              color="initial"
              fontFamily={fontFamily.msr}
              fontSize={16}
              fontWeight={600}
              sx={{ mt: "8px", display: "flex", alignItems: "center" }}
            >
              {detail?.approvedPets?.length} / {detail.capacity}
              <div
                className="progress-bar"
                style={{
                  width: "100px",
                  height: "5px",
                  backgroundColor: "#e5e7eb",
                  marginLeft: "15px",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="progress"
                  style={{
                    width: detail.approvedPets
                      ? `${(detail.approvedPets / detail.capacity) * 100}%`
                      : 0, // Calculate the percentage
                    backgroundColor: "#103559",
                    height: "5px",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutShelter;
