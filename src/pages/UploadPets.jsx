import {
  Box,
  Button,
  Card,
  CardMedia,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import AdoptionFormCard from "../components/AdoptionFormCard";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  borderRadius: "10px",
};

const UploadPets = () => {
  const [showField, setShowField] = useState(false);
  const { user, token } = useGlobalContext();
  const [form, setForm] = useState({
    fullName: "",
    address: null,
    contactNumber: "",
    email: "",
    petImg: "",
    petName: "",
    petAge: "",
    petBreed: "",
    petType: "",
    petDesc: "",
    petMedical: "",
    petColor: "",
    petSize: "",
    gender: "",
  });

  const [viewImage, setViewImage] = useState(false);

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

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOpen = () => {
    setViewImage(true);
  };

  const handleClose = () => {
    setViewImage(false);
  };

  const handleSavePet = async () => {
    const body = {
      petName: form.petName,
      petType: form.petBreed,
      age: form.petAge,
      gender: form.gender,
      address: form.address,
      medicalCondition: form.petMedical,
      description: form.petDesc,
      color: form.petColor,
      size: form.petSize,
      contactPhoneNumber: form.contactNumber,
      contactEmail: form.email,
      created: new Date().toISOString(),
      petCategoryId: form.petType.toLowerCase() === "dog" ? 1 : 2, // Setting category ID as per pet type
      isAdopted: false,
      isApproved: false,
      petImages: [
        {
          imageDescription: "Pet image",
          imageUrl: form.petImg,
          isThumbnailImage: true,
        },
      ],
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/Users/AddNewPet`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status >= 200 && res.status < 300) {
        console.log("Pet uploaded successfully:", res.data);
        return res.data;
      }
    } catch (err) {
      console.error(
        "Error uploading pet:",
        err.response ? err.response.data : err.message
      );
    } finally {
      console.log("Request payload:", body);
    }
  };

  return (
    <Card sx={{ width: "1500px", p: "30px 30px" }}>
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        Upload Pets
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
          //   onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
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
          //   onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputLabelProps={{
            shrink: form.address ? true : undefined,
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
          //   onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputLabelProps={{
            shrink: form.contactNumber ? true : undefined,
          }}
        />

        <TextField
          id=""
          label="Email"
          placeholder="Enter your email address"
          name="email"
          value={form.email}
          //   onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputLabelProps={{
            shrink: form.email ? true : undefined,
          }}
        />
      </div>

      <Typography
        variant="body1"
        color="initial"
        fontSize={16}
        fontFamily={fontFamily.msr}
        fontWeight={600}
        sx={{ my: "20px" }}
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
          value={form.petName}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.petType}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.petBreed}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.petAge}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.petColor}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.petSize}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.petMedical}
          onChange={(e) => handleChangeForm(e)}
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
          value={form.gender}
          onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      </div>
      <div
        className=""
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <TextField
          id=""
          label="Pet image"
          placeholder="Enter type of pet"
          name="petImg"
          value={form.petImg}
          onChange={(e) => handleChangeForm(e)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
            width: "840px",
          }}
        />
        <Button
          sx={{
            bgcolor: "#103559",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            color: "white",
            p: "16px 20px",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={() => handleOpen()}
        >
          View Image
        </Button>
      </div>
      <TextField
        id=""
        label="About pet"
        value={form.petDesc}
        name="petDesc"
        onChange={(e) => handleChangeForm(e)}
        fullWidth
        multiline
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
          mt: "20px",
        }}
      />
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
            color: "#EF4444",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #EF4444",
            fontFamily: fontFamily.msr,
            p: "12px 20px",
          }}
          // onClick={() => handleCloseForm()}
        >
          Clear
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
          onClick={() => handleSavePet()}
        >
          Submit Pet for Shelter
        </Button>
      </div>
      <Modal
        open={viewImage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMedia component={"img"} src={form.petImg} />
        </Box>
      </Modal>
    </Card>
  );
};

export default UploadPets;
