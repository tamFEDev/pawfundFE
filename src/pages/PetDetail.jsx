import {
  Box,
  Button,
  CardMedia,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "../components/Header";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import CustomChip from "../components/CustomChip";
import PetDetailTag from "../components/PetDetailTag";
import CustomDivider from "../components/CustomDivider";
import PetList from "../components/PetList";
import AdoptionBanner from "../components/AdoptionBanner";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";

const adoptionStep = [
  "1. Fill out our adoption application form",
  "2. Our team will review your application",
  "3. We'll schedule a meet-and-greet with the pet",
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
  const { user, token, loading, setLoading, isLogged } = useGlobalContext();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullname,
    address: user?.address,
    contactNumber: user?.phoneNumber,
    email: user?.email,
    personalDesc: "",
    isAdoptPetBefore: null,
    reason: "",
  });
  const [petDetail, setPetDetail] = useState({});
  const [alert, setAlert] = useState(false);
  const [info, setInfo] = useState({
    isError: false,
    message: "",
  });

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleOpenAlert = () => {
    setAlert(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/Users/get-approved-pet-by-id?id=${id}`
        );
        if (res.status === 200) {
          setPetDetail(res.data.data);
        }
        console.log("Pet Detail:", res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPetDetail();
  }, [id]);

  useEffect(() => {
    const fetchShelterDetail = async () => {
      if (!petDetail?.shelterId) return; // Only fetch if shelterId is available

      try {
        const res = await axios.get(
          `${BASE_URL}/api/Shelter/GetInformationShelter/${petDetail.shelterId}`
        );
        if (res.status === 200) {
          setPetDetail((prev) => ({
            ...prev,
            shelterName: res.data.shelterName,
          }));
        }
        console.log("Shelter Detail:", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchShelterDetail();
  }, [petDetail.shelterId, id]); // Trigger only when shelterId is available

  const handleOpen = () => {
    if (isLogged) {
      if (!user?.phoneNumber || !user?.address) {
        setInfo({
          isError: true,
          message: "Please update contact information in 'My Profile' page",
        });
        handleOpenAlert();
        return;
      }
      setOpen(true);
    } else {
      setInfo({
        isError: true,
        message: "Please login to continue",
      });
      handleOpenAlert();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinueForm = () => {
    setOpen(false);
    setOpenForm(true);
  };

  const handleNavigate = () => {
    navigate(`/shelters/${petDetail.shelterId}`);
  };

  const handleCloseForm = () => {
    setForm((prevForm) => ({
      ...prevForm,
      personalDesc: "",
      isAdoptPetBefore: null,
      reason: "",
    }));
    setOpenForm(false);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isFormComplete = () => {
    const { personalDesc, isAdoptPetBefore, reason } = form;

    return (
      personalDesc.trim() !== "" &&
      reason.trim() !== "" &&
      isAdoptPetBefore !== null
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const body = {
      fullName: form.fullName,
      address: form.address,
      phoneNumber: form.contactNumber,
      email: form.email,
      selfDescription: form.personalDesc,
      hasPetExperience: form.isAdoptPetBefore,
      reasonForAdopting: form.reason,
      note: "",
      createDate: new Date().toISOString(),
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/api/Adoption/adoption-request/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setInfo({
          isError: false,
          message: "Adoption request submitted successfully",
        });
        handleOpenAlert();
        handleCloseForm();
      }
    } catch (err) {
      console.log(err);
      setInfo({
        isError: true,
        message: "There has been an error, please try again",
      });
      handleOpenAlert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            src={petDetail.imageUrl}
            sx={{ width: "630px", borderRadius: "10px", height: "630px" }}
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
                {petDetail.petName}
              </Typography>
              <div className="" style={{ display: "flex", gap: 20 }}>
                <CustomChip
                  title={petDetail.petCategoryId == 1 ? "dog" : "cat"}
                  color={"#FFB775"}
                  bgColor={"rgb(255,183,117,0.1)"}
                  fontSize={14}
                  fontWeight={600}
                />
                <CustomChip
                  title={petDetail.petType}
                  color={"#FFB775"}
                  bgColor={"rgb(255,183,117,0.1)"}
                  fontSize={14}
                  fontWeight={600}
                />
              </div>
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
                {petDetail.description}
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
              title={"Shelter name"}
              value={
                <div
                  onClick={() => handleNavigate()}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {petDetail.shelterName}
                </div>
              }
            />
            <CustomDivider />
            <PetDetailTag
              title={"Publish date"}
              value={petDetail.publishDate || "N/A"}
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
              Adopt {petDetail.petName} now
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
              Adopt {petDetail.petName}
            </Typography>
            <Typography
              id="modal-modal-description"
              fontFamily={fontFamily.msr}
              variant="body1"
              color="#667479"
              fontSize={14}
            >
              You&apos;re one step closer to giving {petDetail.petName} a
              forever home! Here&apos;s what happens next:
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
                  border: !loading && "1px solid #103559",
                  fontFamily: fontFamily.msr,
                  p: "12px 20px",
                }}
                disabled={loading}
                onClick={() => handleCloseForm()}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: !isFormComplete() || loading ? "" : "#103559",
                  fontSize: "16px",
                  borderRadius: "10px",
                  fontFamily: fontFamily.msr,
                  p: "12px 20px",
                  color: "white",
                }}
                disabled={!isFormComplete() || loading}
                onClick={() => handleSubmit()}
              >
                {loading ? "Saving..." : "Submit adoption form"}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default PetDetail;
