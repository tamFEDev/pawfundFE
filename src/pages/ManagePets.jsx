import { Button, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import CustomChip from "../components/CustomChip";
import AdoptionFormCard from "../components/AdoptionFormCard";
import MyPetCard from "../components/MyPetCard";
import ManagePetCard from "../components/MangePetCard";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";

const ManagePets = () => {
  const [data, setData] = useState([]);
  const { token } = useGlobalContext();
  useEffect(() => {
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
    fetchAllPets();
  }, []);
  return (
    <div
      className=""
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        padding: "30px 30px",
        // display: "inline-block",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1000px",
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
        style={{ display: "flex", flexWrap: "wrap", gap: 30 }}
      >
        {data.map((d, index) => (
          <ManagePetCard
            key={index}
            name={d.petName}
            isApproved={d.isApproved}
            petBreed={d.petType}
            age={d.age}
            uploadDate={d.createdAt}
            img={d.petImages[0].imageUrl}
            shelterName={d.shelterName}
            shelterAddress={d.shelterAddress}
            petType={d.petCategoryId}
            petColor={d.color}
            petSize={d.size}
            medicalCondition={d.medicalCondition}
            petGender={d.gender}
            aboutPet={d.description}
            userId={d.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagePets;
