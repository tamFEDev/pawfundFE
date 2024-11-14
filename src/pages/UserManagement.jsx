import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";
import CustomDivider from "../components/CustomDivider";

const UserManagement = () => {
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
        padding: "20px 20px",
        // display: "inline-block",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1238px",
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
        style={{ display: "flex", flexWrap: "wrap", gap: 11 }}
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
              p: "188px 300px",
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
                width: "500px",
              }}
            >
              Please wait for users to upload their pets
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontSize={16}
              fontFamily={fontFamily.msr}
              sx={{
                marginTop: "5px",
                display: "inline-block",
                width: "550px",
              }}
            >
              Don&apos;t worry, this happens when our system has no pets to
              fetch
            </Typography>
          </Typography>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserManagement;
