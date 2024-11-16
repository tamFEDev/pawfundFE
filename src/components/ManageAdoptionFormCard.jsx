import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Modal,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import CustomChip from "./CustomChip";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";

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

const ManageAdoptionFormCard = ({
  name,
  submitDate,
  petImg,
  status,
  adoptReason,
  introduction,
  havePetBefore,
  declineReason,
  petId,
  isApproved,
  userId,
  adoptionId,
  onRefresh,
  username,
  reasonForm,
}) => {
  const { user, token, loading, setLoading } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [pet, setPet] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({
    formStatus: null,
    message: "",
  });
  const [alert, setAlert] = useState(false);
  const [info, setInfo] = useState({
    isError: false,
    message: "",
  });

  const handleOpenAlert = () => {
    setAlert(true);
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const isMessageEmpty = () => {
    return form.message.trim() === "";
  };

  const isReasonEmpty = () => {
    return reason.trim() === "";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleUpdate = () => {
    setUpdate(!update);
  };

  // setLoading(true);

  useEffect(() => {
    const fetchPetDetail = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/Users/get-approved-pet-by-id?id=${petId}`
      );
      console.log(res.data.data);

      setPet(res.data.data);
    };
    fetchPetDetail();
  }, []);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/GetUserById?id=${userId}`
      );
      console.log(res.data.data);

      setUserInfo(res.data);
    };
    fetchUserDetail();
  }, []);

  const handleApproveForm = async () => {
    setLoading(true);
    const body = {
      isApproved: 1,
      reason: form.message,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/api/staff/approve-adoption-request/${adoptionId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        handleClose();
        setUpdate(false);
        setInfo({
          isError: false,
          message: "Form approve successfully",
        });
        handleOpenAlert();
      }
    } catch (err) {
      console.log(err);
      setInfo({
        isError: true,
        message: "There has been an error. Please try again",
      });
      handleOpenAlert();
    } finally {
      setLoading(false);
      onRefresh();
    }
  };

  const handleRejectForm = async () => {
    setLoading(true);
    const body = {
      isApproved: 0,
      reason: form.message,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/api/staff/approve-adoption-request/${adoptionId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        handleClose();
        setUpdate(false);
        setInfo({
          isError: false,
          message: "Form rejected successfully",
        });
        handleOpenAlert();
      }
    } catch (err) {
      console.log(err);
      setInfo({
        isError: true,
        message: "There has been an error. Please try again",
      });
      handleOpenAlert();
    } finally {
      setLoading(false);
      onRefresh();
    }
  };

  const formatReadableDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={info.isError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {info.message}
        </Alert>
      </Snackbar>
      <Card sx={{ width: "350px", p: "15px", borderRadius: "8px" }}>
        <div className="" style={{ display: "flex", gap: 12 }}>
          <Avatar src={pet.imageUrl} sx={{ width: "80px", height: "80px" }} />
          <div className="content">
            <div
              className="header"
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                gap: 20,
              }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontFamily={fontFamily.msr}
                fontSize={16}
                fontWeight={600}
              >
                {name}
              </Typography>
              <CustomChip
                title={
                  isApproved == 2
                    ? "Pending"
                    : isApproved == 1
                    ? "Approved"
                    : "Rejected"
                }
                fontSize={12}
                fontWeight={600}
                color={"white"}
                bgColor={
                  isApproved == 2
                    ? "#f0ad4e"
                    : isApproved == 1
                    ? "#5cb85c"
                    : "#EF4444"
                }
              />
            </div>
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontSize={12}
              sx={{
                display: "flex",
                gap: "5px",
                marginTop: "8px",
                marginBottom: "5px",
              }}
            >
              Submitted on{" "}
              <Typography
                variant="body1"
                color="#667479"
                fontFamily={fontFamily.msr}
                fontSize={12}
                fontWeight={600}
              >
                {formatReadableDate(submitDate)}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontSize={12}
              sx={{
                display: "flex",
                gap: "5px",
                // marginTop: "5px",
                // marginBottom: "8px",
              }}
            >
              Requested by{" "}
              <Typography
                variant="body1"
                color="#667479"
                fontFamily={fontFamily.msr}
                fontSize={12}
                fontWeight={600}
                sx={{
                  width: "160px",
                  StaffHeader: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {username}
              </Typography>
            </Typography>
          </div>
        </div>
        <Button
          sx={{
            marginTop: "20px",
            width: "100%",
            bgcolor: "#103559",
            fontFamily: fontFamily.msr,
            fontSize: "14px",
            fontWeight: 600,
            p: "8px 35px",
            textTransform: "none",
            color: "white",
            borderRadius: "10px",
          }}
          onClick={() => handleOpen()}
        >
          View form
        </Button>
        <div className="fill-form">
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
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
                  textAlign={"center"}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  Adoption Application for {name}
                  <CustomChip
                    title={
                      isApproved == 2
                        ? "Pending"
                        : isApproved == 1
                        ? "Approved"
                        : "Rejected"
                    }
                    fontSize={12}
                    fontWeight={600}
                    color={"white"}
                    bgColor={
                      isApproved == 2
                        ? "#f0ad4e"
                        : isApproved == 1
                        ? "#5cb85c"
                        : "#EF4444"
                    }
                  />
                </Typography>
              </div>

              <div className="form" style={{ marginTop: "30px" }}>
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
                    value={userInfo.fullname}
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
                    label="Address"
                    placeholder="Enter your address"
                    name="address"
                    value={userInfo.address}
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
                  className="contact-email"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    margin: "20px 0",
                  }}
                >
                  <TextField
                    id=""
                    placeholder="Enter your contact number"
                    name="contactNumber"
                    label="Contact number"
                    value={userInfo.phoneNumber}
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
                    label="Email"
                    placeholder="Enter your email address"
                    name="email"
                    value={userInfo.email}
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
                  label="Introduction"
                  placeholder="Tell us about yourself and your experience with pets, or why you're interested in adopting."
                  name="personalDesc"
                  value={introduction}
                  // onChange={(e) => handleChangeForm(e)}
                  multiline
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  id=""
                  label="Reason for Adoption"
                  placeholder="Share why you're interested in adopting this pet and how you'll provide a loving home."
                  name="reason"
                  value={adoptReason}
                  // onChange={(e) => handleChangeForm(e)}
                  multiline
                  fullWidth
                  sx={{
                    margin: "20px 0",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  id=""
                  label="Have you own a pet before"
                  placeholder=""
                  name="reason"
                  value={"No, I have not own a pet before"}
                  // onChange={(e) => handleChangeForm(e)}
                  multiline
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                />
              </div>

              {isApproved != 2 && (
                <TextField
                  id=""
                  value={reasonForm}
                  placeholder="Reason"
                  label="Note"
                  multiline
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                    marginTop: "20px",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
              {update ? (
                <>
                  <TextField
                    id=""
                    label="Message"
                    placeholder="Message"
                    name="message"
                    value={form.message}
                    onChange={(e) => handleInputChange(e)}
                    multiline
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                      marginTop: "20px",
                    }}
                  />
                  <div
                    className="button"
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {loading ? (
                      <Button
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "16px",
                          borderRadius: "10px",
                          fontFamily: fontFamily.msr,
                          p: "12px 20px",
                          width: "520px",
                        }}
                        disabled
                      >
                        Saving form ...
                      </Button>
                    ) : (
                      <div className="" style={{ display: "flex", gap: 20 }}>
                        <Button
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            bgcolor:
                              !isMessageEmpty() && "rgb(239, 68, 68, 0.1)",
                            color: "rgb(239 68 68)",
                            fontSize: "16px",
                            borderRadius: "10px",
                            fontFamily: fontFamily.msr,
                            p: "12px 30px",
                            width: "230px",
                          }}
                          disabled={isMessageEmpty()}
                          onClick={() => handleRejectForm()}
                        >
                          Reject
                        </Button>
                        <Button
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            bgcolor:
                              !isMessageEmpty() && "rgb(92, 184, 92, 0.1)",
                            color: "rgb(92, 184, 92)",
                            fontSize: "16px",
                            borderRadius: "10px",
                            // border: "1px solid #103559",
                            fontFamily: fontFamily.msr,
                            p: "12px 30px",
                            width: "230px",
                          }}
                          disabled={isMessageEmpty()}
                          onClick={() => handleApproveForm()}
                        >
                          Approve
                        </Button>
                      </div>
                    )}

                    <Button
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#103559",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: !loading && "1px solid #103559",
                        fontFamily: fontFamily.msr,
                        p: "12px 20px",
                      }}
                      disabled={loading}
                      onClick={() => toggleUpdate()}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div
                  className="button"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                    gap: 15,
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
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                  {isApproved == 2 && (
                    <Button
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "#103559",
                        color: "white",
                        fontSize: "16px",
                        borderRadius: "10px",
                        // border: "1px solid #103559",
                        fontFamily: fontFamily.msr,
                        p: "12px 30px",
                      }}
                      onClick={() => toggleUpdate()}
                    >
                      Edit form
                    </Button>
                  )}
                </div>
              )}
            </Box>
          </Modal>
        </div>
      </Card>
    </>
  );
};

export default ManageAdoptionFormCard;
