import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import { useNavigate } from "react-router-dom";
import CustomChip from "./CustomChip";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";
import CloseIcon from "@mui/icons-material/Close";

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
  //   overflowY: "scroll",
};

const shelterModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const ManagePetCard = ({
  name,
  isApproved,
  petBreed,
  age,
  uploadDate,
  img,
  petType,
  petColor,
  petSize,
  medicalCondition,
  petGender,
  userId,
  petId,
  onRefresh,
  shelterId,
  isAdopted,
  petDesc,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openShelters, setOpenShelters] = useState(false);
  const [user, setUser] = useState({});
  const { token, setLoading, loading } = useGlobalContext();
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [confirmedShelter, setConfirmedShelter] = useState({
    shelterId: null,
    shelterName: null,
    shelterLocation: null,
  });
  const [shelter, setShelter] = useState({
    name: null,
    address: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/Manager/delete-pet-by-manager/${petId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onRefresh();
      handleClose();
    } catch (err) {
      console.log(err);
    }
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

  const formatReadableDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card sx={{ p: "15px", width: "270px", borderRadius: "20px" }}>
      <CardMedia
        component={"img"}
        src={img}
        sx={{ width: "100%", height: "270px", borderRadius: "10px" }}
      />
      <div className="card-content" style={{ marginTop: "10px" }}>
        <CustomChip
          title={isAdopted ? "Adopted" : "In Shelter"}
          color={isAdopted ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"}
          bgColor={
            isAdopted ? "rgb(22, 163, 74, 0.1)" : "rgb(217, 119, 6, 0.1)"
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
            {formatReadableDate(uploadDate)}
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
              gap: 80,
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
              <div className="" style={{ display: "flex", gap: 10 }}>
                <CustomChip
                  title={isAdopted ? "Adopted" : "In Shelter"}
                  color={isAdopted ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"}
                  bgColor={
                    isAdopted
                      ? "rgb(22, 163, 74, 0.1)"
                      : "rgb(217, 119, 6, 0.1)"
                  }
                  fontSize={12}
                  fontWeight={600}
                />
                <Typography
                  variant="body1"
                  color="#667479"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  fontFamily={fontFamily.msr}
                  fontSize={13}
                >
                  Uploaded Date:{" "}
                  <Typography
                    variant="body1"
                    color="#667479"
                    fontFamily={fontFamily.msr}
                    fontWeight={600}
                    fontSize={13}
                  >
                    {formatReadableDate(uploadDate)}
                  </Typography>
                </Typography>
              </div>
              <Typography
                variant="body1"
                color="initial"
                fontSize={24}
                fontWeight={600}
                fontFamily={fontFamily.msr}
                //   textAlign={"center"}
                sx={{ display: "flex", alignItems: "center", mt: "10px" }}
              >
                Hello, My name is {name}
                {/* {isApproved
                  ? `${name} has found a Shelter`
                  : `Finding Shelter for ${name}`} */}
              </Typography>

              <Typography
                variant="body1"
                fontFamily={fontFamily.msr}
                color="#667479"
                fontSize={14}
                //   textAlign={"center"}
              >
                Anh this is my detailed information
              </Typography>
            </div>

            <Avatar src={img} sx={{ width: "80px", height: "80px" }} />
          </div>

          <div
            className="modal-content"
            style={{
              // height: (confirmedShelter.shelterId || shelter.name) && "480px",
              // overflowY:
              //   (confirmedShelter.shelterId || shelter.name) && "scroll",
              paddingRight: "10px",
            }}
          >
            {/* <div className="user-info" style={{ marginBottom: "15px" }}>
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                fontFamily={fontFamily.msr}
                fontWeight={600}
                sx={{ mb: "15px" }}
              >
                User Information
              </Typography>
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
                  placeholder="Enter your full name"
                  name="fullName"
                  label="Full name"
                  value={user.fullname}
                  //   onChange={(e) => handleChangeForm(e)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  InputLabelProps={
                    {
                      // shrink: form.fullName ? true : undefined,
                    }
                  }
                />
                <TextField
                  id=""
                  label="Address"
                  placeholder="Enter your address"
                  name="address"
                  value={user.address}
                  //   onChange={(e) => handleChangeForm(e)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  InputLabelProps={
                    {
                      // shrink: form.address ? true : undefined,
                    }
                  }
                />
              </div>
              <div
                className="contact-email"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: "20px",
                }}
              >
                <TextField
                  id=""
                  placeholder="Enter your contact number"
                  name="contactNumber"
                  label="Contact number"
                  value={user.phoneNumber}
                  //   onChange={(e) => handleChangeForm(e)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  InputLabelProps={
                    {
                      // shrink: form.contactNumber ? true : undefined,
                    }
                  }
                />

                <TextField
                  id=""
                  label="Email"
                  placeholder="Enter your email address"
                  name="email"
                  value={user.email}
                  //   onChange={(e) => handleChangeForm(e)}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  InputLabelProps={
                    {
                      // shrink: form.email ? true : undefined,
                    }
                  }
                />
              </div>
            </div> */}
            <div className="pet-info">
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                fontFamily={fontFamily.msr}
                fontWeight={600}
                sx={{ mb: "15px" }}
              >
                Pet Information
              </Typography>
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
                  value={petType == 1 ? "dog" : "cat"}
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
                label="Pet description"
                placeholder="Enter type of pet"
                name="gender"
                value={petDesc}
                //   onChange={(e) => handleChangeForm(e)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  mt: "20px",
                }}
              />

              {/* {isApproved ? (
                <div className="" style={{ display: "flex", gap: 10 }}>
                  <TextField
                    id=""
                    label="Shelter Name"
                    value={shelter.name}
                    name="petDesc"
                    // onChange={(e) => handleChangeForm(e)}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                      mt: "20px",
                    }}
                  />
                  <TextField
                    id=""
                    label="Shelter Location"
                    value={shelter.address}
                    // name="petDesc"
                    // onChange={(e) => handleChangeForm(e)}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                      mt: "20px",
                    }}
                  />
                </div>
              ) : (
                confirmedShelter.shelterId !== null && (
                  <div className="" style={{ display: "flex", gap: 10 }}>
                    <TextField
                      id=""
                      label="Shelter Name"
                      value={confirmedShelter.shelterName}
                      name="petDesc"
                      // onChange={(e) => handleChangeForm(e)}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                        },
                        mt: "20px",
                      }}
                    />
                    <TextField
                      id=""
                      label="Shelter Location"
                      value={confirmedShelter.shelterLocation}
                      // name="petDesc"
                      // onChange={(e) => handleChangeForm(e)}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                        },
                        mt: "20px",
                      }}
                    />
                  </div>
                )
              )} */}
            </div>
          </div>
          <div
            className="button"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              // gap: 243,
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#EF4444",
                fontSize: "16px",
                borderRadius: "10px",
                fontFamily: fontFamily.msr,
                p: "12px 20px",
                color: "white",
              }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </Card>
  );
};

export default ManagePetCard;
