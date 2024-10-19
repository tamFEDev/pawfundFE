import { Button, Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import { fontFamily } from "../constants";
import CustomChip from "./CustomChip";
import { useLocation } from "react-router-dom";

const ShelterCard = ({
  name,
  location,
  contact,
  email,
  ocTime,
  cat,
  dog,
  img,
}) => {
  const loc = useLocation();
  const currentPath = loc.pathname;
  return (
    <Card sx={{ p: "15px", width: "425px", borderRadius: "20px" }}>
      <CardMedia
        component={"img"}
        src={img}
        sx={{ width: "100%", height: "233px", borderRadius: "10px" }}
      />
      <div className="card-content" style={{ marginTop: "15px" }}>
        <div
          className="chip-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "10px",
          }}
        >
          <CustomChip
            title={`${dog} dogs`}
            color={"#FFB775"}
            bgColor={"rgb(255,183,117,0.1)"}
            fontSize={14}
            fontWeight={600}
          />
          <CustomChip
            title={`${cat} cats`}
            color={"#9E896A"}
            bgColor={"rgb(158,137,106,0.1)"}
            fontSize={14}
            fontWeight={600}
          />
        </div>
        <Typography
          variant="body1"
          color="initial"
          fontFamily={fontFamily.msr}
          fontSize={16}
          fontWeight={600}
        >
          {name}
        </Typography>
        <div className="sub-content" style={{ marginTop: "10px" }}>
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={14}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Location:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontWeight={600}
              fontSize={14}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {location}
            </Typography>
          </Typography>
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
              fontSize={14}
              fontFamily={fontFamily.msr}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Contact:{" "}
              <Typography
                variant="body1"
                color="#667479"
                fontSize={14}
                fontWeight={600}
                fontFamily={fontFamily.msr}
              >
                {contact}
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
              fontFamily={fontFamily.msr}
              fontSize={14}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Email:{" "}
              <Typography
                variant="body1"
                color="#667479"
                fontFamily={fontFamily.msr}
                fontSize={14}
                fontWeight={600}
                sx={{
                  width: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {email}
              </Typography>
            </Typography>
          </div>
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={14}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Opening/Closing:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontSize={14}
              fontWeight={600}
            >
              {ocTime}
            </Typography>
          </Typography>
        </div>
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
      >
        {currentPath === "/shelters" ? "Take a visit" : "Donate us!"}
      </Button>
    </Card>
  );
};

export default ShelterCard;
