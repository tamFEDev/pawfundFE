import { Button, Card, TextField, Typography } from "@mui/material";
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

const MyProfile = () => {
  const [showField, setShowField] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    contactNumber: "",
    email: "",
    newPassword: "",
    oldPassword: "",
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
          marginTop: "15px",
        }}
      >
        Update Profile
      </Button>
      <Typography
        variant="body1"
        color="initial"
        fontSize={16}
        fontFamily={fontFamily.msr}
        fontWeight={600}
        sx={{ my: "20px" }}
      >
        Authentication
      </Typography>
      {showField && (
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
            placeholder="Enter your old password"
            name="oldPassword"
            label="Old Password"
            value={form.oldPassword}
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
            label="New Password"
            placeholder="Enter your new password"
            name="newPassword"
            value={form.newPassword}
            //   onChange={(e) => handleChangeForm(e)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </div>
      )}
      <div
        className=""
        style={{ display: "flex", gap: 10, marginTop: showField && "15px" }}
      >
        <Button
          sx={{
            bgcolor: !showField && "#103559",
            border: showField && "1px solid #103559",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            color: !showField ? "white" : "#103559",
            p: "10px 20px",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={() => handleShow()}
        >
          {showField ? "Cancel" : "Change Password"}
        </Button>
        {showField && (
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
            onClick={() => handleShow()}
          >
            Save password
          </Button>
        )}
      </div>
    </Card>
  );
};

export default MyProfile;
