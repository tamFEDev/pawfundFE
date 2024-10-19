import {
  Box,
  Button,
  CardMedia,
  Modal,
  OutlinedInput,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../components/Header";
import { fontFamily, imgURL } from "../constants";
import CustomChip from "../components/CustomChip";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import PetList from "../components/PetList";
import AdoptionBanner from "../components/AdoptionBanner";
import Footer from "../components/Footer";
import { useState } from "react";

const petDetail = {
  name: "Shibe milo",
  animal: "dog",
  breed: "Shiba inu",
  age: "2 years old",
  medicalCondition: "Vaccinated",
  publishDate: "12-Oct-2022",
  size: "small",
  color: "black",
  shelterLocation: "Hanoi, Vietnam",
  shelterName: "Trại thú cưng ABC - TP. Hồ Chí Minh",
  gender: "Male",
  desc: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. Hes great with kids and other dogs, making him the perfect addition to an active family. Buddy is fully vaccinated and house-trained.",
};

const adoptionStep = [
  "1. Fill out our adoption application form",
  "2. Our team will review your application",
  "3. We'll schedule a meet-and-greet with Buddy",
  "4. If it's a match, we'll finalize the adoption process",
];

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

const PetDetail = () => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    contactNumber: "",
    email: "",
    personalDesc: "",
    isAdoptPetBefore: null,
    reason: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleContinueForm = () => {
    setOpen(false);
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setForm({
      fullName: "",
      address: "",
      contactNumber: "",
      email: "",
      personalDesc: "",
      isAdoptPetBefore: null,
      reason: "",
    });
    setOpenForm(false);
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const isFormComplete = () => {
    const {
      fullName,
      address,
      contactNumber,
      email,
      personalDesc,
      isAdoptPetBefore,
      reason,
    } = form;

    return (
      fullName.trim() !== "" &&
      address.trim() !== "" &&
      contactNumber.trim() !== "" &&
      email.trim() !== "" &&
      personalDesc.trim() !== "" &&
      reason.trim() !== "" &&
      isAdoptPetBefore !== null
    );
  };
  return (
    <div>
      <Header />
      <div
        className=""
        style={{
          marginTop: "70px",
          padding: "0 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="pet-detail"
          style={{ display: "flex", alignItems: "center", gap: 50 }}
        >
          <CardMedia
            component={"img"}
            src={imgURL.shiba}
            sx={{ width: "630px", borderRadius: "10px" }}
          />
          <div className="pet-desc" style={{ width: "600px" }}>
            <div
              className="name-type"
              style={{ display: "flex", alignItems: "center", gap: 30 }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={32}
                fontWeight={700}
                fontFamily={fontFamily.msr}
              >
                {petDetail.name}
              </Typography>
              <CustomChip
                title={`dog`}
                color={"#FFB775"}
                bgColor={"rgb(255,183,117,0.1)"}
                fontSize={14}
                fontWeight={600}
              />
              <CustomChip
                title={petDetail.breed}
                color={"#FFB775"}
                bgColor={"rgb(255,183,117,0.1)"}
                fontSize={14}
                fontWeight={600}
              />
            </div>
            <div
              className="pet-desc"
              style={{ marginTop: "10px", marginBottom: "25px" }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontFamily={fontFamily.msr}
              >
                {petDetail.desc}
              </Typography>
            </div>
            <PetDetailTag title={"Gender"} value={petDetail.gender} />
            <CustomDivider />
            <PetDetailTag title={"Age"} value={petDetail.age} />
            <CustomDivider />
            <PetDetailTag title={"Size"} value={petDetail.size} />
            <CustomDivider />
            <PetDetailTag title={"Color"} value={petDetail.color} />
            <CustomDivider />
            <PetDetailTag
              title={"Medical condition"}
              value={petDetail.medicalCondition}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Location"}
              value={petDetail.shelterLocation}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Publish date"}
              value={petDetail.publishDate}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Shelter name"}
              value={petDetail.shelterName}
            />
            <Button
              sx={{
                bgcolor: "#003459",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
                fontFamily: fontFamily.msr,
                textTransform: "none",
                borderRadius: "20px",
                width: "100%",
                py: "12px",
                marginTop: "40px",
              }}
              onClick={() => handleOpen()}
            >
              Adopt {petDetail.name} now
            </Button>
          </div>
        </div>
      </div>
      <div
        className="other-pets"
        style={{ paddingLeft: "60px", marginTop: "60px" }}
      >
        <Typography
          variant="body1"
          color="#103559"
          fontFamily={"Montserrat"}
          sx={{}}
          fontSize={16}
        >
          Other Pets You Might Love
        </Typography>

        <Typography
          variant="body1"
          color="#103559"
          fontFamily={"Montserrat"}
          sx={{ mt: "5px" }}
          fontSize={24}
          fontWeight={600}
        >
          Discover more pets waiting for a loving home!
        </Typography>
      </div>
      <PetList amount={4} />
      <AdoptionBanner mt={"60px"} />
      <Footer mt={"100px"} />
      <div className="ask">
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="body1"
              fontFamily={fontFamily.msr}
              fontSize={24}
              fontWeight={600}
            >
              Adopt {petDetail.name}
            </Typography>
            <Typography
              id="modal-modal-description"
              fontFamily={fontFamily.msr}
              variant="body1"
              color="#667479"
              fontSize={14}
            >
              You&apos;re one step closer to giving {petDetail.name} a forever
              home! Here&apos;s what happens next:
            </Typography>
            <div
              className="step"
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {adoptionStep.map((s, index) => (
                <Typography
                  variant="body1"
                  color="initial"
                  key={index}
                  fontFamily={fontFamily.msr}
                >
                  {s}
                </Typography>
              ))}
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
                onClick={() => handleClose()}
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
                onClick={() => handleContinueForm()}
              >
                Start adoption processs
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="fill-form">
        <Modal
          open={openForm}
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
              textAlign={"center"}
            >
              Adoption Application for {petDetail.name}
            </Typography>
            <Typography
              variant="body1"
              fontFamily={fontFamily.msr}
              color="#667479"
              fontSize={14}
              textAlign={"center"}
            >
              Please fill out this form to start the adoption process
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
                  value={form.fullName}
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
                  value={form.contactNumber}
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
                />
              </div>
              <TextField
                id=""
                label="Introduction"
                placeholder="Tell us about yourself and your experience with pets, or why you're interested in adopting."
                name="personalDesc"
                value={form.personalDesc}
                onChange={(e) => handleChangeForm(e)}
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
                value={form.reason}
                onChange={(e) => handleChangeForm(e)}
                multiline
                fullWidth
                sx={{
                  margin: "20px 0",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Have you adopt a pet before
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.isAdoptPetBefore}
                  label="Have you adopt a pet before"
                  name="isAdoptPetBefore"
                  onChange={(e) => handleChangeForm(e)}
                  sx={{ borderRadius: "10px" }}
                >
                  <MenuItem value={true}>
                    Yes, I have owned a pet before
                  </MenuItem>
                  <MenuItem value={false}>
                    No, I have not own a pet before
                  </MenuItem>
                </Select>
              </FormControl>
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
                onClick={() => handleCloseForm()}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: isFormComplete() ? "#103559" : "",
                  fontSize: "16px",
                  borderRadius: "10px",
                  fontFamily: fontFamily.msr,
                  p: "12px 20px",
                  color: "white",
                }}
                disabled={!isFormComplete()}
                onClick={() => handleContinueForm()}
              >
                Submit adoption form
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default PetDetail;
