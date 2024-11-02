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
  InputAdornment,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../GlobalProvider";

const donationValue = [
  { name: "10.000đ", value: 10000 },
  { name: "20.000đ", value: 20000 },
  { name: "50.000đ", value: 50000 },
  { name: "100.000đ", value: 100000 },
  { name: "Custom", value: 0 },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 540,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const ShelterDetail = () => {
  const [open, setOpen] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState(null);

  const [shelterDetail, setShelterDetail] = useState({});
  const [form, setForm] = useState({
    donation: 0,
    note: "",
  });

  const [pets, setPets] = useState([]);

  const [customDonation, setCustomDonation] = useState(null);

  const { user } = useGlobalContext();

  const { id } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/Shelter/GetInformationShelter/${id}`
        );
        if (res.status == 200) {
          setShelterDetail(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchPetsInShelter = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/Users/get-pets-in-shelter/${id}`
        );
        if (res.status == 200) {
          setPets(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPetsInShelter();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(user);
  }, []);

  useEffect(() => {
    if (selectedPrice === 0 && customDonation) {
      handleUpdateForm("donation", Number(customDonation));
    }
  }, [customDonation]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setForm({ donation: 0, note: "" });
    setCustomDonation(null);
    setSelectedPrice(null);
  };

  const handleChangePrice = (d) => {
    if (d == 0) {
      setSelectedPrice(d);
      handleUpdateForm("donation", customDonation);
    } else {
      setSelectedPrice(d.value);
      handleUpdateForm("donation", d.value);
    }
  };

  const handleUpdateForm = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "note") {
      handleUpdateForm(name, value);
    } else {
      setCustomDonation(value);
    }
  };

  const isFormComplete = () => {
    const { donation } = form;
    return donation !== 0;
  };

  const handleSubmit = async () => {
    console.log(form);
    try {
      const body = {
        transactionAmount: form.donation,
        isMoneyDonation: true,
        isResourceDonation: true,
        userId: user.userId,
        transactionTypeId: 1,
      };
      const res = await axios.post(`${BASE_URL}/api/Transaction/create`, body);
      if (res.status === 200) {
        window.location.href = res.data.vnpayUrl;
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    // handleClose();
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
            src={shelterDetail.shelterImage}
            sx={{ width: "500px", height: "500px", borderRadius: "10px" }}
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
                {shelterDetail.shelterName}
              </Typography>
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
                {shelterDetail.description}
              </Typography>
            </div>
            <PetDetailTag
              title={"Location"}
              value={shelterDetail.shelterLocation}
            />
            <CustomDivider />
            <PetDetailTag
              title={"Contact number"}
              value={shelterDetail.contact}
            />
            <CustomDivider />
            <PetDetailTag title={"Email"} value={shelterDetail.email} />
            <CustomDivider />
            <PetDetailTag
              title={"Opening / Closing"}
              value={shelterDetail.openingClosing}
            />
            <CustomDivider />
            <PetDetailTag title={"Capacity"} value={shelterDetail.capacity} />

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
              Donate us
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
          Meet Our Current Residents!
        </Typography>

        <Typography
          variant="body1"
          color="#103559"
          fontFamily={"Montserrat"}
          sx={{ mt: "5px" }}
          fontSize={24}
          fontWeight={600}
        >
          Here are some wonderful pets waiting for their forever home
        </Typography>
      </div>
      <PetList amount={4} petsInShelter={pets} />
      <AdoptionBanner mt={"60px"} />
      <Footer mt={"100px"} />
      <div className="donation-modal">
        <Modal
          open={open}
          onClose={handleClose}
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
              Make a Donation
            </Typography>
            <Typography
              id="modal-modal-description"
              fontFamily={fontFamily.msr}
              variant="body1"
              color="#667479"
              fontSize={14}
            >
              Your support helps us continue our mission. Thank you for your
              generosity!
            </Typography>
            <div
              className="donate-container"
              style={{
                display: "flex",
                gap: 15,
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              {donationValue.map((d, index) => (
                <Button
                  key={index}
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontSize: "16px",
                    color: "black",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor:
                      selectedPrice === d.value ? "black" : "#EBEEEF",
                    borderRadius: "10px",
                    textTransform: "none",
                    p: d.name === "Custom" ? "10px 94px" : "10px 25px",
                  }}
                  onClick={() => handleChangePrice(d)}
                >
                  {d.name}
                </Button>
              ))}
              <TextField
                id=""
                label=""
                value={customDonation}
                onChange={(e) => handleInputChange(e)}
                sx={{ borderRadius: "10px", width: "267px" }}
                InputProps={{
                  sx: {
                    borderRadius: "10px", // Apply border-radius to the input
                  },
                  endAdornment: (
                    <InputAdornment position="end">đ</InputAdornment>
                  ),
                }}
                onFocus={() => handleChangePrice(0)}
              />
            </div>
            <div className="note" style={{ marginTop: "20px" }}>
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                fontFamily={fontFamily.msr}
              >
                Add a note (optional)
              </Typography>
              <OutlinedInput
                id=""
                label=""
                placeholder="Write a message to shelter"
                value={form.note}
                name="note"
                onChange={(e) => handleInputChange(e)}
                sx={{
                  borderRadius: "10px",
                  fontFamily: fontFamily.msr,
                  marginTop: "10px",
                }}
                multiline
                fullWidth
              />
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
                  bgcolor: isFormComplete() ? "#103559" : "",
                  fontSize: "16px",
                  borderRadius: "10px",
                  fontFamily: fontFamily.msr,
                  py: "12px",
                  color: "white",
                  width: "450px",
                }}
                onClick={() => handleSubmit()}
                disabled={!isFormComplete()}
              >
                Donate{" "}
                {form.donation ? `${form.donation.toLocaleString()}đ` : ""}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ShelterDetail;
