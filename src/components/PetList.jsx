import { useEffect, useState } from "react";
import { BASE_URL, imgURL } from "../constants";
import PetCard from "./PetCard";
import axios from "axios";

const PetList = ({ mb, amount, petsInShelter }) => {
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/Users/get-all-approved-pet`
        );
        if (res.status == 200) {
          setAllPets(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPets();
  }, []);
  return (
    <>
      <div
        className="pet-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 26,
          marginTop: "30px",
          justifyContent: "flex-start",
          marginBottom: mb,
          padding: "0 60px",
        }}
      >
        {petsInShelter
          ? petsInShelter.map((pet, index) => (
              <PetCard
                key={index}
                image={pet.petImages[0].imageUrl}
                name={pet.petName}
                gender={pet.gender}
                type={pet.petType}
                location={pet.location}
                petCategory={pet.petCategoryId}
                petId={pet.petId}
                shelterId={pet.shelterId}
              />
            ))
          : allPets.map((pet, index) => (
              <PetCard
                key={index}
                image={pet.imageUrl}
                name={pet.petName}
                gender={pet.gender}
                type={pet.petType}
                location={pet.location}
                petCategory={pet.petCategoryId}
                petId={pet.petId}
                shelterId={pet.shelterId}
              />
            ))}
      </div>
    </>
  );
};

export default PetList;
