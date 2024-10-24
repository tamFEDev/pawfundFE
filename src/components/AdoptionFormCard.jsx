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
import { fontFamily, imgURL } from "../constants";
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

const AdoptionFormCard = ({
  name,
  submitDate,
  petImg,
  status,
  adoptReason,
  introduction,
  havePetBefore,
  declineReason,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ width: "250px", p: "15px", borderRadius: "8px" }}>
      <div className="" style={{ display: "flex", gap: 12 }}>
        <Avatar src={imgURL.dogo} sx={{ width: "80px", height: "80px" }} />
        <div className="content">
          <Typography
            variant="body1"
            color="initial"
            fontFamily={fontFamily.msr}
            fontSize={16}
            fontWeight={600}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={12}
            sx={{
              display: "flex",
              gap: "5px",
              marginTop: "2px",
              marginBottom: "8px",
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
              {submitDate}
            </Typography>
          </Typography>
          <CustomChip
            title={status}
            fontSize={12}
            fontWeight={600}
            color={status === "Approved" ? "black" : "white"}
            bgColor={
              status === "Rejected"
                ? "#EF4444"
                : status === "Pending"
                ? "black"
                : null
            }
            border={status === "Approved" && "solid 1px black"}
          />
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
                  title={status}
                  fontSize={12}
                  fontWeight={600}
                  color={status === "Approved" ? "black" : "white"}
                  bgColor={
                    status === "Rejected"
                      ? "#EF4444"
                      : status === "Pending"
                      ? "black"
                      : null
                  }
                  border={status === "Approved" && "solid 1px black"}
                />
              </Typography>
            </div>

            <Typography
              variant="body1"
              fontFamily={fontFamily.msr}
              color="#667479"
              fontSize={14}
              textAlign={"center"}
            >
              Once it has been sent. You cannot edit this form
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
                  placeholder="Enter your full name"
                  name="fullName"
                  label="Full name"
                  value={"form.fullName"}
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
                  value={"form.address"}
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
                  value={"form.contactNumber"}
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
                  value={"email"}
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
              {status === "Rejected" ? (
                <TextField
                  id=""
                  label="Decline reason"
                  placeholder=""
                  name="reason"
                  value={"Sorry you're not capable"}
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
              ) : (
                ""
              )}
            </div>
            <div
              className="button"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
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
            </div>
          </Box>
        </Modal>
      </div>
    </Card>
  );
};

export default AdoptionFormCard;
