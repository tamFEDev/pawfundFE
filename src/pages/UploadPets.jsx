import {
  Button,
  Card,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { fontFamily, imgURL } from "../constants";
import AdoptionFormCard from "../components/AdoptionFormCard";

const data = {
  fullName: "Do Dang Phuc Anh",
  address: "123 Main Street, Anytown USA",
  contactNumber: "(+84) 0987635263",
  email: "phucanhdodang1211@gmail.com",
};

const UploadPets = () => {
  const [showField, setShowField] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
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

  const handleShow = () => {
    setShowField(!showField);
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
          value={data.fullName}
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
          value={data.address}
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
          marginTop: "20px",
        }}
      >
        <TextField
          id=""
          placeholder="Enter your contact number"
          name="contactNumber"
          label="Contact number"
          value={data.contactNumber}
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
          value={data.email}
          //   onChange={(e) => handleChangeForm(e)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
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
          name="address"
          value={form.petType}
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
          name="address"
          value={form.petBreed}
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
          name="petName"
          label="Pet age"
          value={form.petAge}
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
          name="address"
          value={form.petType}
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
          name="address"
          value={form.petBreed}
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
          name="petName"
          label="Medical condition"
          value={form.petMedical}
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
          name="address"
          value={form.gender}
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
          name="address"
          value={form.petImg}
          //   onChange={(e) => handleChangeForm(e)}

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
        >
          View Image
        </Button>
      </div>
      <TextField
        id=""
        label="About pet"
        value={form.petDesc}
        // onChange={}
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
          // onClick={() => handleContinueForm()}
        >
          Submit Pet for Shelter
        </Button>
      </div>
    </Card>
  );
};

export default UploadPets;
