import { Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { BASE_URL, fontFamily } from "../constants";

import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";

const MyProfile = () => {
  const { user, token, setUser } = useGlobalContext();
  const [showField, setShowField] = useState(false);
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    contactNumber: "",
    email: "",
    newPassword: "",
    oldPassword: "",
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
    setUpdate(!update);
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
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleShow = () => {
    setShowField(!showField);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
      <div className="" style={{ display: "flex", gap: 10, marginTop: "15px" }}>
        <Button
          sx={{
            bgcolor: !update && "#103559",
            border: update && "1px solid #103559",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            color: !update ? "white" : "#103559",
            p: "10px 20px",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={() => handleUpdate()}
        >
          {update ? "Cancel" : "Update Profile"}
        </Button>
        {update && (
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
            onClick={() => handleUpdate()}
          >
            Save Profile
          </Button>
        )}
      </div>
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
