import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import CustomDivider from "../components/CustomDivider";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";

const AdoptionForms = () => {
  const { token } = useGlobalContext();

  const [forms, setForms] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/Admin/get-pending-approve-requests-list`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Data:", response.data.data);
      setForms(response.data.data);
    };
    fetchForms();
  }, []);

  useEffect(() => {
    console.log("Forms State Updated:", forms);
  }, [forms]);

  return (
    <div
      className=""
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        padding: "20px 20px",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1240px",
        // height: "570px",
      }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={24}
          fontWeight={600}
          fontFamily={fontFamily.msr}
        >
          Pet Adoption Forms
        </Typography>
      </div>
      <CustomDivider padding={"20px 0"} />
      <div
        className="card-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {forms?.length > 0 ? (
          <Typography
            variant="body1"
            color="initial"
            fontFamily={fontFamily.msr}
            fontSize={30}
            fontWeight={600}
            textAlign={"center"}
            sx={{
              p: "192px 300px",
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
              {/* <PetsIcon /> */}
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
                width: "550px",
              }}
            >
              There are currently no pets available for sheltering.
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontSize={16}
              fontFamily={fontFamily.msr}
              sx={{
                marginTop: "2px",
                display: "inline-block",
                width: "600px",
              }}
            >
              As a staff member, please add new pets to the shelter system if
              needed.
            </Typography>
          </Typography>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdoptionForms;
