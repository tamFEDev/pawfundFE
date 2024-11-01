import { Typography } from "@mui/material";
import React from "react";
import { fontFamily } from "../constants";

const PetDetailTag = ({ title, value }) => {
  return (
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
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="initial"
        fontFamily={fontFamily.msr}
        fontWeight={600}
      >
        {value}
      </Typography>
    </div>
  );
};

export default PetDetailTag;
