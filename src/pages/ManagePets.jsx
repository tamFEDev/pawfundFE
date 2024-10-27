import { Button, CardMedia, Typography } from "@mui/material";
import React from "react";
import { fontFamily, imgURL } from "../constants";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import CustomChip from "../components/CustomChip";
import AdoptionFormCard from "../components/AdoptionFormCard";
import MyPetCard from "../components/MyPetCard";
import ManagePetCard from "../components/MangePetCard";

const data = [
  {
    name: "Dogo",
    isApproved: false,
    petBreed: "German Shepherd",
    age: "5 years",
    uploadDate: "2023-10-20",
    img: imgURL.dogo,
    petType: "Dog",
    petColor: "Golden",
    petSize: "Medium",
    medicalCondition: "Healthy",
    petGender: "Male",
    // petImage: "https://example.com/images/buddy.jpg",
    aboutPet:
      "Buddy is a friendly and playful dog who loves to be around people.",
  },
  {
    name: "Bella",
    isApproved: true,
    petBreed: "Golden Retriever",
    age: "3 years",
    uploadDate: "2023-09-15",
    img: imgURL.dogo,
    shelterName: "Hopeful Tails Shelter",
    shelterAddress: "789 Maple Ave, Petville",
    petType: "Dog",
    petColor: "Golden",
    petSize: "Medium",
    medicalCondition: "Healthy",
    petGender: "Male",
    // petImage: "https://example.com/images/buddy.jpg",
    aboutPet:
      "Buddy is a friendly and playful dog who loves to be around people.",
  },
  {
    name: "Milo",
    isApproved: false,
    petBreed: "Bulldog",
    age: "2 years",
    uploadDate: "2023-08-30",
    img: imgURL.dogo,
    petType: "Dog",
    petColor: "Golden",
    petSize: "Medium",
    medicalCondition: "Healthy",
    petGender: "Male",
    // petImage: "https://example.com/images/buddy.jpg",
    aboutPet:
      "Buddy is a friendly and playful dog who loves to be around people.",
  },
  {
    name: "Luna",
    isApproved: true,
    petBreed: "Siberian Husky",
    age: "4 years",
    uploadDate: "2023-07-25",
    img: imgURL.dogo,
    shelterName: "Hopeful Tails Shelter",
    shelterAddress: "789 Maple Ave, Petville",
    petType: "Dog",
    petColor: "Golden",
    petSize: "Medium",
    medicalCondition: "Healthy",
    petGender: "Male",
    // petImage: "https://example.com/images/buddy.jpg",
    aboutPet:
      "Buddy is a friendly and playful dog who loves to be around people.",
  },
  {
    name: "Charlie",
    isApproved: false,
    petBreed: "Poodle",
    age: "1 year",
    uploadDate: "2023-10-10",
    img: imgURL.dogo,
    petType: "Dog",
    petColor: "Golden",
    petSize: "Medium",
    medicalCondition: "Healthy",
    petGender: "Male",
    // petImage: "https://example.com/images/buddy.jpg",
    aboutPet:
      "Buddy is a friendly and playful dog who loves to be around people.",
  },
  {
    name: "Max",
    isApproved: true,
    petBreed: "Beagle",
    age: "6 years",
    uploadDate: "2023-09-05",
    img: imgURL.dogo,
    shelterName: "Hopeful Tails Shelter",
    shelterAddress: "789 Maple Ave, Petville",
    petType: "Dog",
    petColor: "Golden",
    petSize: "Medium",
    medicalCondition: "Healthy",
    petGender: "Male",
    // petImage: "https://example.com/images/buddy.jpg",
    aboutPet:
      "Buddy is a friendly and playful dog who loves to be around people.",
  },
];

const ManagePets = () => {
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
            name={d.name}
            isApproved={d.isApproved}
            petBreed={d.petBreed}
            age={d.age}
            uploadDate={d.uploadDate}
            img={d.img}
            shelterName={d.shelterName}
            shelterAddress={d.shelterAddress}
            petType={d.petType}
            petColor={d.petColor}
            petSize={d.petSize}
            medicalCondition={d.medicalCondition}
            petGender={d.petGender}
            aboutPet={d.aboutPet}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagePets;
