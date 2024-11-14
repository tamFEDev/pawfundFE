import { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CustomDivider from "../components/CustomDivider";
import PetsIcon from "@mui/icons-material/Pets";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";
import ManagePetCard from "../components/MangePetCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  //   overflowY: "scroll",
};

const ShelterPet = () => {
  const { token, user } = useGlobalContext();
  const [detail, setDetail] = useState({
    shelter: {},
    pets: [],
  });
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle input changes
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const body = {
      petName: form.petName,
      petType: form.petBreed,
      age: form.petAge,
      gender: form.gender,
      address: detail.shelter.shelterLocation,
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
      const res = await axios.post(
        `${BASE_URL}/api/staff/AddNewPet-by-staff`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      await fetchPets();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchShelterDetail = async (shelterId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Shelter/GetInformationShelter/${shelterId}`
      );
      setDetail((prev) => ({
        ...prev,
        shelter: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
    console.log(detail);
  };

  const fetchPets = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/staff/get-pet-in-shelter-by-staff`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetail((prev) => ({
        ...prev,
        pets: res.data,
      }));
      console.log(detail.pets);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchShelterID = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/staff/getShelterId?staffId=${user.userId}`
        );
        const shelterId = res.data.shelterId;
        console.log(shelterId);
        fetchShelterDetail(shelterId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShelterID();
  }, []);

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div
      className=""
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        padding: "20px 20px",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1240px",
        // height: "570px",
      }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={24}
          fontWeight={600}
          fontFamily={fontFamily.msr}
        >
          Available Pets in Shelter
        </Typography>
        <Button
          sx={{
            bgcolor: "#003459",
            color: "white",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: fontFamily.msr,
            p: "10px 30px",
            borderRadius: "10px",
          }}
          onClick={() => handleOpen()}
        >
          Add New Pet
        </Button>
      </div>
      <CustomDivider padding={"20px 0"} />
      <div
        className="card-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {detail.pets.length == 0 ? (
          <Typography
            variant="body1"
            color="initial"
            fontFamily={fontFamily.msr}
            fontSize={30}
            fontWeight={600}
            textAlign={"center"}
            sx={{
              p: "160px 300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className=""
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              <PetsIcon />
              No pets found
            </div>
            <Typography
              variant="body1"
              color="#667479"
              fontSize={20}
              fontWeight={600}
              fontFamily={fontFamily.msr}
              sx={{
                marginTop: "10px",
                display: "inline-block",
                width: "550px",
              }}
            >
              There are currently no pets available for sheltering.
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontSize={16}
              fontFamily={fontFamily.msr}
              sx={{
                marginTop: "2px",
                display: "inline-block",
                width: "600px",
              }}
            >
              As a staff member, please add new pets to the shelter system if
              needed.
            </Typography>
          </Typography>
        ) : (
          detail.pets.map((d, index) => (
            <ManagePetCard
              key={index}
              name={d.petName}
              isApproved={d.isApproved}
              isAdopted={d.isAdopted}
              petBreed={d.petType}
              age={d.age}
              uploadDate={d.createdAt}
              img={d?.petImages[0]?.imageUrl}
              petType={d.petCategoryId}
              petColor={d.color}
              petSize={d.size}
              medicalCondition={d.medicalCondition}
              petGender={d.gender}
              aboutPet={d.description}
              userId={d.userId}
              petId={d.petId}
              shelterId={d?.shelterId}
              petDesc={d.description}
              onRefresh={fetchPets}
            />
          ))
        )}
      </div>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            fontFamily={fontFamily.msr}
            fontSize={26}
            fontWeight={700}
            // color="#2E3A59"
          >
            Welcome a New Friend to Your Shelter
          </Typography>
          <Typography
            id="modal-modal-description"
            fontFamily={fontFamily.msr}
            variant="body2"
            color="#58677A"
            fontSize={15}
            sx={{ mt: "5px" }}
          >
            Here are the information that user will see if you add a new pet
          </Typography>
          <div className="form-box" style={{ marginTop: "25px" }}>
            <Typography
              variant="body1"
              color="initial"
              fontSize={16}
              fontFamily={fontFamily.msr}
              fontWeight={600}
              sx={{ mb: "15px" }}
            >
              Shelter Information
            </Typography>
            <div
              className="shelter-information"
              style={{ display: "flex", gap: 10, marginBottom: "20px" }}
            >
              <TextField
                id=""
                label="Shelter Name"
                value={detail.shelter.shelterName}
                // onChange={(e) => handleChangeForm(e)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                id=""
                label="Shelter Address"
                value={detail.shelter.shelterLocation}
                // onChange={(e) => handleChangeForm(e)}
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
              sx={{ mb: "15px" }}
            >
              Pet Information
            </Typography>
            <div
              className="shelter-information"
              style={{ display: "flex", gap: 15 }}
            >
              <TextField
                id=""
                label="Pet Name"
                name="petName"
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
                label="Pet Type"
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
                label="Pet Breed"
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
              className="shelter-information"
              style={{ display: "flex", gap: 15, marginTop: 15 }}
            >
              <TextField
                id=""
                label="Pet Age"
                name="petAge"
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
                label="Pet Color"
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
                label="Pet Size"
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
              className="shelter-information"
              style={{ display: "flex", gap: 15, marginTop: 15 }}
            >
              <TextField
                id=""
                label="Medical Condition"
                name="petMedical"
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
                label="Pet Gender"
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
              className="shelter-information"
              style={{
                display: "flex",
                gap: 15,
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <TextField
                id=""
                label="Pet image"
                name="petImg"
                value={form.petImg}
                onChange={(e) => handleChangeForm(e)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                  width: "700px",
                }}
              />
              <Button
                sx={{
                  bgcolor: "#103559",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: fontFamily.msr,
                  color: "white",
                  p: "16px 15px",
                  textTransform: "none",
                  borderRadius: "10px",
                  width: "150px",
                }}
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
                mt: "15px",
              }}
            />
          </div>
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
              onClick={() => handleSubmit()}
            >
              Submit Pet for Shelter
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ShelterPet;
