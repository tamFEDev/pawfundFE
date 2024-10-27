import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import MyPetCard from "../components/MyPetCard";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";

const MyPet = () => {
  const { token } = useGlobalContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/Users/GetPet-of-User`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status == 200) {
          setData(res.data);
        }
        console.log(res.data.petImages.imageUrl);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPets();
  }, []);
  return (
    <Card sx={{ width: "1500px", p: "30px 30px" }}>
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        My Pets
      </Typography>
      <CustomDivider padding={"20px 0"} />
      <div
        className="card-container"
        style={{ display: "flex", flexWrap: "wrap", gap: 30 }}
      >
        {data.map((d, index) => (
          <MyPetCard
            key={index}
            name={d.petName}
            isApproved={d.isApproved}
            petBreed={d.petType}
            age={d.age}
            uploadDate={d.createdAt}
            img={d.petImages.length > 0 ? d.petImages[0].imageUrl : imgURL.dogo}
            // img={d.petImages.imageUrl ? d.petImages.imageUrl : imgURL.dogo}
            shelterName={d.shelterName}
            shelterAddress={d.shelterAddress}
            petType={d.petCategoryId}
            petColor={d.color}
            petSize={d.size}
            medicalCondition={d.medicalCondition}
            petGender={d.gender}
            aboutPet={d.description}
          />
        ))}
      </div>
    </Card>
  );
};

export default MyPet;
