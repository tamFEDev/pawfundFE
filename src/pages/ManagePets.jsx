import { Button, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import CustomChip from "../components/CustomChip";
import AdoptionFormCard from "../components/AdoptionFormCard";
import MyPetCard from "../components/MyPetCard";
import ManagePetCard from "../components/ManagePetCard";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";
import PetsIcon from "@mui/icons-material/Pets";

const ManagePets = () => {
  const [data, setData] = useState([]);
  const { token } = useGlobalContext();

  const fetchAllPets = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Manager/get-all-pet-by-manager`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        setData(res.data.data);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  return (
    <div
      className=""
      style={{
        padding: "20px 20px",
        // display: "inline-block",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1238px",
      }}
    >
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        Pets for Sheltering
      </Typography>
      <CustomDivider padding={"20px 0"} />
      <div
        className="card-container"
        style={{ display: "flex", flexWrap: "wrap", gap: 11 }}
      >
        {data.length == 0 ? (
          <Typography
            variant="body1"
            color="initial"
            fontFamily={fontFamily.msr}
            fontSize={30}
            fontWeight={600}
            textAlign={"center"}
            sx={{
              p: "188px 300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className=""
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              <PetsIcon />
              No pets found
            </div>
            <Typography
              variant="body1"
              color="#667479"
              fontSize={20}
              fontWeight={600}
              fontFamily={fontFamily.msr}
              sx={{
                marginTop: "10px",
                display: "inline-block",
                width: "500px",
              }}
            >
              Please wait for users to upload their pets
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontSize={16}
              fontFamily={fontFamily.msr}
              sx={{
                marginTop: "5px",
                display: "inline-block",
                width: "550px",
              }}
            >
              Don&apos;t worry, this happens when our system has no pets to
              fetch
            </Typography>
          </Typography>
        ) : (
          data.map((d, index) => (
            <ManagePetCard
              key={index}
              name={d.petName}
              isApproved={d.isApproved}
              petBreed={d.petType}
              age={d.age}
              uploadDate={d.createdAt}
              img={d?.petImages[0]?.imageUrl}
              petType={d.petCategoryId}
              petColor={d.color}
              petSize={d.size}
              medicalCondition={d.medicalCondition}
              petGender={d.gender}
              aboutPet={d.description}
              userId={d.userId}
              petId={d.petId}
              shelterId={d?.shelterId}
              onRefresh={fetchAllPets}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ManagePets;
