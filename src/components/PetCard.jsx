import { Button, Card, CardMedia, Typography } from "@mui/material";
import { BASE_URL, fontFamily } from "../constants";
import { useNavigate } from "react-router-dom";
import CustomChip from "./CustomChip";
import { useEffect, useState } from "react";
import axios from "axios";

const PetCard = ({
  name,
  gender,
  type,
  location,
  image,
  key,
  petCategory,
  petId,
  shelterId,
}) => {
  const navigate = useNavigate();

  const [shelter, setShelter] = useState({
    name: null,
    address: null,
  });

  const handleNavigate = (id) => {
    navigate(`/adoption/${id}`);
  };

  useEffect(() => {
    const fetchShelterDetail = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/Shelter/GetInformationShelter/${shelterId}`
      );
      if (res.status == 200) {
        setShelter({
          name: res.data.shelterName,
          address: res.data.shelterLocation,
        });
      }
    };
    fetchShelterDetail();
  }, [shelterId]);
  return (
    <Card key={key} sx={{ p: "15px", width: "300px", borderRadius: "20px" }}>
      <CardMedia
        component={"img"}
        src={image}
        sx={{ width: "300px", height: "300px", borderRadius: "10px" }}
      />
      <div className="card-content" style={{ marginTop: "10px" }}>
        <div
          className="header"
          style={{ display: "flex", gap: 10, alignItems: "center" }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontSize={16}
            fontWeight={600}
            fontFamily={"Montserrat"}
          >
            {name}
          </Typography>
          <CustomChip
            title={petCategory == 1 ? "dog" : "cat"}
            color={"#FFB775"}
            bgColor={"rgb(255,183,117,0.1)"}
            fontSize={14}
            fontWeight={600}
          />
        </div>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "10px 0",
          }}
        >
          <Typography
            variant="body1"
            color="#667479"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            fontSize={13}
            fontFamily={"Montserrat"}
          >
            Gender:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={"Montserrat"}
              fontSize={13}
              fontWeight={600}
            >
              {gender}
            </Typography>
          </Typography>
          <div
            className="circle"
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "10000px",
              backgroundColor: "#667479",
            }}
          ></div>
          <Typography
            variant="body1"
            color="#667479"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            fontFamily={"Montserrat"}
            fontSize={13}
          >
            Type:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontWeight={600}
              fontSize={13}
            >
              {type}
            </Typography>
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="#667479"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            my: "10px",
          }}
          fontFamily={fontFamily.msr}
          fontSize={12}
        >
          Shelter:{" "}
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={13}
            fontWeight={600}
          >
            {shelter.name}
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          color="#667479"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "100%",
          }}
          fontFamily={fontFamily.msr}
          fontSize={12}
        >
          Location:{" "}
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={13}
            fontWeight={600}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {shelter.address}
          </Typography>
        </Typography>
      </div>
      <Button
        sx={{
          width: "100%",
          bgcolor: "#103559",
          borderRadius: "25px",
          fontWeight: 600,
          color: "white",
          textTransform: "none",
          marginTop: "24px",
          fontFamily: fontFamily.msr,
        }}
        onClick={() => handleNavigate(petId)}
      >
        More about me!
      </Button>
    </Card>
  );
};

export default PetCard;
