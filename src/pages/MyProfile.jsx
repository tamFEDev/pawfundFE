import {
  Alert,
  Box,
  Button,
  Card,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { BASE_URL, fontFamily } from "../constants";

import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";
import CustomChip from "../components/CustomChip";

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

const MyProfile = () => {
  const { user, token, setUser, loading, setLoading } = useGlobalContext();
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    contactNumber: "",
    email: "",
    newPassword: "",
    oldPassword: "",
  });
  const [open, setOpen] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [verification, setVerification] = useState({
    address: "",
    phoneNumber: "",
    occupation: "",
    idCardNumber: "",
    petCareCapacity: "",
    // dateGet: "2024-11-13T16:09:45.009Z",
    placeGet: "",
    usualAddress: "",
  });

  useEffect(() => {
    if (form.address || form.contactNumber) {
      setVerification((prev) => ({
        ...prev,
        address: form.address,
        phoneNumber: form.contactNumber,
      }));
    }
  }, [form.address, form.contactNumber]);

  useEffect(() => {
    console.log(user);
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullname,
        address: user.address,
        contactNumber: user.phoneNumber,
        email: user.email,
        newPassword: "",
        oldPassword: "",
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);

    if (update) {
      try {
        const body = {
          fullname: form.fullName,
          email: form.email,
          phoneNumber: form.contactNumber,
          address: form.address,
          password: form.newPassword,
        };
        const res = await axios.put(
          `${BASE_URL}/api/Users/UpdateProfile-by-user`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status >= 200 && res.status < 300) {
          const updatedUser = body; // Assuming the response contains the updated user data
          setUser(updatedUser); // Update the user state
          localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage with new user data
          console.log(updatedUser);
          handleOpen();
          setUpdate(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeVerification = (e) => {
    const { name, value } = e.target;
    setVerification({ ...verification, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenVerification = () => {
    setOpenVerification(true);
  };

  const handleCloseVerification = () => {
    setOpenVerification(false);
    setVerification({
      address: "",
      phoneNumber: "",
      occupation: "",
      idCardNumber: "",
      petCareCapacity: "",
      // dateGet: "2024-11-13T16:09:45.009Z",
      placeGet: "",
      usualAddress: "",
    });
  };

  const handleSubmit = async () => {
    const body = {
      address: verification.address,
      phoneNumber: verification.phoneNumber,
      occupation: verification.occupation,
      idCardNumber: verification.idCardNumber,
      petCareCapacity: verification.petCareCapacity,
      dateGet: new Date().toISOString(),
      placeGet: verification.placeGet,
      usualAddress: verification.usualAddress,
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/api/Users/create-request-approve-info-user`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        handleCloseVerification();
      }
    } catch (err) {
      console.log(err);
    }
    console.log(verification);
  };

  return (
    <Card sx={{ width: "1500px", p: "30px 30px" }}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User info updated successfully
        </Alert>
      </Snackbar>
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        My Profile
      </Typography>
      <CustomDivider padding={"20px 0"} />

      <Typography
        variant="body1"
        color="initial"
        fontSize={16}
        fontFamily={fontFamily.msr}
        fontWeight={600}
        sx={{ mb: "20px" }}
      >
        Personal Information
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
          value={form.fullName}
          onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputProps={{
            readOnly: update ? false : true,
          }}
          InputLabelProps={{
            shrink: form.fullName ? true : undefined,
          }}
        />
        <TextField
          id=""
          label="Address"
          placeholder="Enter your address"
          name="address"
          value={form.address}
          onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputProps={{
            readOnly: update ? false : true,
          }}
          InputLabelProps={{
            shrink: form.fullName ? true : undefined,
          }}
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
          value={form.contactNumber}
          onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputProps={{
            readOnly: update ? false : true,
          }}
          InputLabelProps={{
            shrink: form.fullName ? true : undefined,
          }}
        />
        <TextField
          id=""
          label="Email"
          placeholder="Enter your email address"
          name="email"
          value={form.email}
          onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputProps={{
            readOnly: update ? false : true,
          }}
          InputLabelProps={{
            shrink: form.fullName ? true : undefined,
          }}
        />
      </div>
      {update ? (
        <div
          className="button"
          style={{ display: "flex", gap: 10, marginTop: "15px" }}
        >
          <Button
            sx={{
              // bgcolor: !update && "#103559",
              border: !loading && "1px solid #103559",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: fontFamily.msr,
              color: !update ? "white" : "#103559",
              p: "10px 20px",
              textTransform: "none",
              borderRadius: "10px",
            }}
            disabled={loading}
            onClick={() => setUpdate(!update)}
          >
            Cancel
          </Button>

          <Button
            sx={{
              bgcolor: !loading && "#103559",
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: fontFamily.msr,
              color: "white",
              p: "10px 20px",
              textTransform: "none",
              borderRadius: "10px",
            }}
            disabled={loading}
            onClick={() => handleUpdate()}
          >
            Save Profile
          </Button>
        </div>
      ) : (
        <Button
          sx={{
            bgcolor: "#103559",
            border: "1px solid #103559",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            color: "white",
            p: "10px 20px",
            textTransform: "none",
            borderRadius: "10px",
            marginTop: "15px",
          }}
          onClick={() => setUpdate(!update)}
        >
          Update Profile
        </Button>
      )}

      <div
        className=""
        style={{ display: "flex", alignItems: "center", gap: 20 }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={16}
          fontFamily={fontFamily.msr}
          fontWeight={600}
          sx={{ my: "20px" }}
        >
          Account Verification Status
        </Typography>
        <CustomChip
          title={
            user.isApprovedUser ? "Verified Account" : "Unverified Account"
          }
          color={user.isApprovedUser ? "rgb(22, 163, 74)" : "rgb(217, 119, 6)"}
          bgColor={
            user.isApprovedUser
              ? "rgb(22, 163, 74, 0.1)"
              : "rgb(217, 119, 6, 0.1)"
          }
          fontSize={12}
          fontWeight={600}
        />
      </div>

      <div className="" style={{ display: "flex", gap: 10 }}>
        <Button
          sx={{
            bgcolor: "#103559",

            fontSize: "12px",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            color: "white",
            p: "10px 20px",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={() => handleOpenVerification()}
        >
          Request verification
        </Button>
      </div>

      <Modal
        open={openVerification}
        onClose={handleCloseVerification}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="body1"
            color="initial"
            fontSize={24}
            fontWeight={600}
            fontFamily={fontFamily.msr}
            textAlign={"left"}
          >
            Requets for Account Verification
          </Typography>
          <Typography
            variant="body1"
            fontFamily={fontFamily.msr}
            color="#667479"
            fontSize={14}
            textAlign={"left"}
          >
            Please provide your necessary credential information to expedite the
            adoption process.
          </Typography>
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
                placeholder="Enter your address"
                name="address"
                label="Address"
                value={verification.address}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                id=""
                label="Contact number"
                placeholder="Enter your contact number"
                name="address"
                value={verification.phoneNumber}
                // onChange={(e) => handleChangeForm(e)}
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
                placeholder="How many are there in your family"
                name="occupation"
                label="Family Occupation"
                value={verification.occupation}
                onChange={(e) => handleChangeVerification(e)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                id=""
                label="Pet Care Capacity"
                placeholder="Pet Care Capacity"
                name="petCareCapacity"
                value={verification.petCareCapacity}
                onChange={(e) => handleChangeVerification(e)}
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
                placeholder="Enter your ID Number"
                name="idCardNumber"
                label="ID Number"
                value={verification.idCardNumber}
                onChange={(e) => handleChangeVerification(e)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                id=""
                placeholder="Enter provided ID place"
                name="placeGet"
                label="Provided location"
                value={verification.placeGet}
                onChange={(e) => handleChangeVerification(e)}
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
                label="Enter your current address"
                placeholder="Current Address"
                name="usualAddress"
                value={verification.usualAddress}
                onChange={(e) => handleChangeVerification(e)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
            </div>
          </div>
          <div
            className="button"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
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
              onClick={() => handleCloseVerification()}
            >
              Cancel
            </Button>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#103559",
                fontSize: "16px",
                borderRadius: "10px",
                fontFamily: fontFamily.msr,
                p: "12px 20px",
                color: "white",
              }}
              // disabled={!isFormComplete()}
              onClick={() => handleSubmit()}
            >
              Submit request
            </Button>
          </div>
        </Box>
      </Modal>
    </Card>
  );
};

export default MyProfile;
