import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import CustomDivider from "../components/CustomDivider";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";
import PetsIcon from "@mui/icons-material/Pets";
import ManagePetCard from "../components/ManagePetCard";
import AdoptionFormCard from "../components/AdoptionFormCard";
import ManageAdoptionFormCard from "../components/ManageAdoptionFormCard";

const AdoptionForms = () => {
  const { token } = useGlobalContext();

  const [forms, setForms] = useState(null);

  const fetchForms = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/staff/get-all-adoptions-by-staff-and-manager`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response Data:", response.data);
    setForms(response.data);
  };

  useEffect(() => {
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
        height: "580px",
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
        {forms?.length == 0 ? (
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
              <PetsIcon />
              No forms found
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
                width: "590px",
              }}
            >
              There are currently no adoption forms for your shelter
            </Typography>
          </Typography>
        ) : (
          forms?.map((d, index) => (
            <ManageAdoptionFormCard
              key={index}
              name={d.petName}
              petId={d.petId}
              // submitDate={d.submitDate}
              // petImg={d.petImg}
              isApproved={d.isApproved}
              adoptReason={d.reasonForAdopting}
              introduction={d.selfDescription}
              havePetBefore={d.hasPetExperience}
              // declineReason={d.declineReason}
              userId={d.userId}
              adoptionId={d.adoptionId}
              onRefresh={fetchForms}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdoptionForms;
