import { useEffect } from "react";
import { BASE_URL, imgURL } from "../constants";
import PetCard from "./PetCard";
import StaffPetCard from "./StaffPetCard";
import axios from "axios";

const petInfo = [
  {
    name: "Pomerian White",
    gener: "Male",
    type: "Pomerian",
    location: "Trại thú cưng ABC - TP. Hồ Chí Minh",
    image: imgURL.dogo,
  },
  {
    name: "Golden Retriever",
    gener: "Female",
    type: "Golden Retriever",
    location: "Trại thú cưng XYZ - Hà Nội",
    image: imgURL.dogo,
  },
  {
    name: "Siberian Husky",
    gener: "Male",
    type: "Husky",
    location: "Trại chó Lân Hổ - Đà Nẵng",
    image: imgURL.dogo,
  },
  {
    name: "British Shorthair",
    gener: "Female",
    type: "Cat",
    location: "Nhà mèo Paws - TP. Hồ Chí Minh",
    image: imgURL.dogo,
  },
  {
    name: "Shiba Inu",
    gener: "Male",
    type: "Shiba",
    location: "Trại chó Nhật - Hải Phòng",
    image: imgURL.dogo,
  },
  {
    name: "Cocker Spaniel",
    gener: "Female",
    type: "Spaniel",
    location: "Trại thú cưng Sun - Huế",
    image: imgURL.dogo,
  },
  {
    name: "Persian Cat",
    gener: "Female",
    type: "Cat",
    location: "Trại mèo Fluffy - Hà Nội",
    image: imgURL.dogo,
  },
  {
    name: "Persian Cat",
    gener: "Female",
    type: "Cat",
    location: "Trại mèo Fluffy - Hà Nội",
    image: imgURL.dogo,
  },
];

const PetList = ({ mb, amount, mt, jc, isStaff, shelterId }) => {
  // useEffect(() => {
  //   const fetchPets = async () => {
  //     let res;
  //     if (shelterId) {
  //       res = await axios.get(`${BASE_URL}/api/`);
  //     }
  //   };
  // }, []);
  return (
    <>
      {isStaff ? (
        <div
          className="pet-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
          }}
        >
          {petInfo.slice(0, amount).map((pet, index) => (
            <StaffPetCard
              key={index}
              image={pet.image}
              name={pet.name}
              gender={pet.gener}
              type={pet.type}
              location={pet.location}
            />
          ))}
        </div>
      ) : (
        <div
          className="pet-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
            marginTop: "30px",
            justifyContent: "center",
            marginBottom: mb,
          }}
        >
          {petInfo.slice(0, amount).map((pet, index) => (
            <PetCard
              key={index}
              image={pet.image}
              name={pet.name}
              gender={pet.gener}
              type={pet.type}
              location={pet.location}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PetList;
