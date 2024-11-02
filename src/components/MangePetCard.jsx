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

  const handleOpen = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/Shelter/GetAllShelters`);
      if (res.status == 200) {
        setShelters(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedShelter(null);
    setConfirmedShelter({
      shelterId: null,
      shelterName: null,
      shelterLocation: null,
    });
  };

  const handleCancelPick = () => {
    handleCloseShelter();
    setSelectedShelter(null);
  };

  const handleOpenShelters = () => {
    setOpenShelters(true);
  };

  const handleCloseShelter = () => {
    setOpenShelters(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/Manager/delete-pet-by-manager/${petId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        onRefresh();
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePet = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/Manager/approve-pet/${petId}/${confirmedShelter.shelterId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        console.log("pet has been moved to shelter");
        onRefresh();
        handleClose();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUserByID = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/Admin/GetUserById?id=${userId}`
        );
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserByID();
  }, [userId]);

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

  const handleSelectShelter = (shelter) => {
    console.log(shelter);
    setSelectedShelter(shelter);
  };

  const handleConfirmShelter = (shelter) => {
    setConfirmedShelter({
      shelterId: shelter.shelterId,
      shelterName: shelter.shelterName,
      shelterLocation: shelter.shelterLocation,
    });
    console.log(confirmedShelter);
    handleCloseShelter();
  };

  useEffect(() => {
    console.log(token);
  }, []);

  return (
    <Card sx={{ p: "15px", width: "270px", borderRadius: "20px" }}>
      <CardMedia
        component={"img"}
        src={img}
        sx={{ width: "100%", height: "270px", borderRadius: "10px" }}
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
                  title={isApproved ? "Approved" : "Awaiting shelter"}
                  color={isApproved ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"}
                  bgColor={
                    isApproved
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
                {isApproved
                  ? `${name} has found a Shelter`
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
                  ? `Staff will be notified about ${name}`
                  : "Please review this form to ensure accurate shelter placement."}
              </Typography>
            </div>

            <Avatar src={img} sx={{ width: "80px", height: "80px" }} />
          </div>

          <div
            className="modal-content"
            style={{
              height: (confirmedShelter.shelterId || shelter.name) && "480px",
              overflowY:
                (confirmedShelter.shelterId || shelter.name) && "scroll",
              paddingRight: "10px",
            }}
          >
            <div className="user-info" style={{ marginBottom: "15px" }}>
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
            </div>
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
              {isApproved ? (
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
              )}
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
            {!isApproved && (
              <div className="" style={{ display: "flex", gap: 15 }}>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#103559",
                    fontSize: "16px",
                    borderRadius: "10px",
                    fontFamily: fontFamily.msr,
                    p: "12px 20px",
                    border: "1px solid #103559",
                  }}
                  //   disabled={!isFormComplete()}
                  onClick={() => handleOpenShelters()}
                >
                  Move to Shelter
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    bgcolor: confirmedShelter.shelterId && "#103559",
                    fontSize: "16px",
                    borderRadius: "10px",
                    fontFamily: fontFamily.msr,
                    p: "12px 20px",
                    color: "white",
                  }}
                  disabled={confirmedShelter.shelterId ? false : true}
                  onClick={() => handleSavePet()}
                >
                  Save Pet
                </Button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <Modal
        open={openShelters}
        onClose={handleCloseShelter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={shelterModal}>
          <div
            className=""
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
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
              Pick a shelter for {name}
            </Typography>

            <Typography
              variant="body1"
              fontFamily={fontFamily.msr}
              color="#667479"
              fontSize={14}
            >
              {isApproved
                ? `Staff will be notified about ${name}`
                : "Please review this form to ensure accurate shelter placement."}
            </Typography>
          </div>
          <div
            className=""
            style={{
              overflowY: "scroll",
              height: "480px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: "20px",
              padding: "10px 10px",
              cursor: "pointer",
            }}
          >
            {shelters.map((s, index) => (
              <div
                className=""
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px",
                  border: selectedShelter === s && "1px solid #103559",
                  borderRadius: "10px",
                }}
                onClick={() => handleSelectShelter(s)}
              >
                <CardMedia
                  component={"img"}
                  src={s.shelterImage}
                  sx={{ width: "100px", height: "100px", borderRadius: "10px" }}
                />
                <div className="">
                  <Typography
                    variant="body1"
                    color="initial"
                    key={index}
                    fontFamily={fontFamily.msr}
                    fontWeight={600}
                    fontSize={18}
                  >
                    {s.shelterName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="#667479"
                    fontSize={16}
                    fontFamily={fontFamily.msr}
                    sx={{ mt: "3px" }}
                  >
                    {s.shelterLocation}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontFamily={fontFamily.msr}
                    fontSize={16}
                    sx={{ mt: "8px", display: "flex", alignItems: "center" }}
                  >
                    Capacity: {s.approvedPets.length}/{s.capacity}
                    <div
                      className="progress-bar"
                      style={{
                        width: "100px",
                        height: "5px",
                        backgroundColor: "#e5e7eb",
                        marginLeft: "15px",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        className="progress"
                        style={{
                          width: `${
                            (s.approvedPets.length / s.capacity) * 100
                          }%`, // Calculate the percentage
                          backgroundColor: "#103559",
                          height: "5px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </div>
                  </Typography>
                </div>
              </div>
            ))}
          </div>
          <div
            className=""
            style={{
              display: "flex",
              gap: 15,
              marginTop: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#103559",
                fontSize: "16px",
                borderRadius: "10px",
                border: "1px solid #103559",
                fontFamily: fontFamily.msr,
                p: "12px 20px",
              }}
              onClick={() => handleCancelPick()}
            >
              Cancel
            </Button>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: selectedShelter ? "#103559" : "",
                fontSize: "16px",
                borderRadius: "10px",
                fontFamily: fontFamily.msr,
                p: "12px 20px",
                color: "white",
              }}
              disabled={selectedShelter === null}
              onClick={() => handleConfirmShelter(selectedShelter)}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </Card>
  );
};

export default ManagePetCard;
