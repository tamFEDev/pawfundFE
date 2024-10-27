import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { fontFamily } from "../constants";
import { useNavigate } from "react-router-dom";
import CustomChip from "./CustomChip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const MyPetCard = ({
  name,
  isApproved,
  petBreed,
  age,
  uploadDate,
  img,
  shelterName,
  shelterAddress,
  petType,
  petColor,
  petSize,
  medicalCondition,
  petGender,

  aboutPet,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ p: "15px", width: "270px", borderRadius: "20px" }}>
      <CardMedia
        component={"img"}
        src={img}
        sx={{ width: "100%", borderRadius: "10px", height: "250px" }}
      />
      <div className="card-content" style={{ marginTop: "10px" }}>
        <CustomChip
          title={isApproved ? "Approved" : "Awaiting shelter"}
          color={isApproved ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"}
          bgColor={
            isApproved ? "rgb(22, 163, 74, 0.1)" : "rgb(217, 119, 6, 0.1)"
          }
          fontSize={12}
          fontWeight={600}
        />
        <Typography
          variant="body1"
          color="initial"
          fontSize={16}
          fontWeight={600}
          fontFamily={"Montserrat"}
          sx={{ mt: "10px" }}
        >
          {name}
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            fontSize={12}
            fontFamily={"Montserrat"}
          >
            Age:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={"Montserrat"}
              fontSize={12}
              fontWeight={600}
            >
              {age}
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
            fontSize={12}
          >
            Type:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontWeight={600}
              fontSize={12}
            >
              {petBreed}
            </Typography>
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="#667479"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          fontFamily={fontFamily.msr}
          fontSize={12}
        >
          Upload date:{" "}
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={12}
            fontWeight={600}
          >
            {uploadDate}
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
        onClick={() => handleOpen()}
      >
        View pet
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <div
            className="header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              //   gap: 30,
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              className="left"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                // gap: 10,
              }}
            >
              <CustomChip
                title={isApproved ? "Approved" : "Awaiting shelter"}
                color={isApproved ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"}
                bgColor={
                  isApproved ? "rgb(22, 163, 74, 0.1)" : "rgb(217, 119, 6, 0.1)"
                }
                fontSize={12}
                fontWeight={600}
              />
              <Typography
                variant="body1"
                color="initial"
                fontSize={24}
                fontWeight={600}
                fontFamily={fontFamily.msr}
                //   textAlign={"center"}
                sx={{ display: "flex", alignItems: "center", mt: "10px" }}
              >
                {isApproved
                  ? `${name} has found a Shelter!`
                  : `Finding Shelter for ${name}`}
              </Typography>

              <Typography
                variant="body1"
                fontFamily={fontFamily.msr}
                color="#667479"
                fontSize={14}
                //   textAlign={"center"}
              >
                {isApproved
                  ? `A Shelter nearby has agreed to adopt ${name}. Check now`
                  : "Thanks for saving lives. Our staffs will reach out soon"}
              </Typography>
            </div>
            <Avatar src={img} sx={{ width: "80px", height: "80px" }} />
          </div>
          <div
            className="name-address"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <TextField
              id=""
              placeholder="Enter pet name"
              name="petName"
              label="Pet name"
              value={name}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              id=""
              label="Pet type"
              placeholder="Enter type of pet"
              name="petType"
              value={petType}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              id=""
              label="Pet breed"
              placeholder="Enter breed of pet"
              name="petBreed"
              value={petBreed}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </div>
          <div
            className="name-address"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              marginTop: "20px",
            }}
          >
            <TextField
              id=""
              placeholder="Enter pet name"
              name="petAge"
              label="Pet age"
              value={age}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              id=""
              label="Pet color"
              placeholder="Enter type of pet"
              name="petColor"
              value={petColor}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              id=""
              label="Pet size"
              placeholder="Enter breed of pet"
              name="petSize"
              value={petSize}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </div>

          <div
            className="name-address"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              marginTop: "20px",
            }}
          >
            <TextField
              id=""
              placeholder="Enter pet name"
              name="petMedical"
              label="Medical condition"
              value={medicalCondition}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              id=""
              label="Pet gender"
              placeholder="Enter type of pet"
              name="gender"
              value={petGender}
              //   onChange={(e) => handleChangeForm(e)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </div>

          <TextField
            id=""
            label="About pet"
            value={aboutPet}
            name="petDesc"
            // onChange={(e) => handleChangeForm(e)}
            fullWidth
            multiline
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
              mt: "20px",
            }}
          />
          {isApproved && (
            <div
              className="shelter-msg"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                marginTop: "20px",
              }}
            >
              <TextField
                id=""
                label="Shelter name"
                value={shelterName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  width: "50%",
                }}
              />
              <TextField
                id=""
                label="Shelter address"
                value={shelterAddress}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  width: "50%",
                }}
              />
            </div>
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default MyPetCard;
