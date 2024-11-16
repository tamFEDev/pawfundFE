import { useEffect, useState } from "react";
import { BASE_URL, imgURL } from "../constants";
import ShelterCard from "./ShelterCard";
import axios from "axios";

const ShelterList = ({ mb }) => {
  const [shelters, setShelters] = useState([]);
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/Shelter/GetAllShelters`
        );
        setShelters(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    fetchShelters();
  }, []);

  return (
    <div
      className="shelter-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 17,
        marginTop: "30px",
        justifyContent: "flex-start",
        marginBottom: mb,
        // padding: "0 60px",
      }}
    >
      {shelters.map((s, index) => (
        <ShelterCard
          key={s.shelterId}
          name={s.shelterName}
          id={s.shelterId}
          location={s.shelterLocation}
          contact={s.contact}
          email={s.email}
          ocTime={s.openingClosing}
          cat={s.cat}
          dog={s.dog}
          img={s.shelterImage}
          capacity={s.capacity}
        />
      ))}
    </div>
  );
};

export default ShelterList;
