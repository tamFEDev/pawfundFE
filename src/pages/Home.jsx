import Header from "../components/Header";
import { Button, CardMedia, Typography } from "@mui/material";
import { imgURL } from "../constants";
import PetCard from "../components/PetCard";
import Banner from "../components/Banner";
import ShelterCard from "../components/ShelterCard";
import Banner2 from "../components/Banner2";

const petInfo = [
  {
    name: "Pomerian White",
    gener: "Male",
    type: "Pomerian",
    location: "Trại thú cưng ABC - TP. Hồ Chí Minh",
    image: imgURL.dogo,
  },
  {
    name: "Golden Retriever",
    gener: "Female",
    type: "Golden Retriever",
    location: "Trại thú cưng XYZ - Hà Nội",
    image: imgURL.dogo,
  },
  {
    name: "Siberian Husky",
    gener: "Male",
    type: "Husky",
    location: "Trại chó Lân Hổ - Đà Nẵng",
    image: imgURL.dogo,
  },
  {
    name: "British Shorthair",
    gener: "Female",
    type: "Cat",
    location: "Nhà mèo Paws - TP. Hồ Chí Minh",
    image: imgURL.dogo,
  },
  {
    name: "Shiba Inu",
    gener: "Male",
    type: "Shiba",
    location: "Trại chó Nhật - Hải Phòng",
    image: imgURL.dogo,
  },
  {
    name: "Cocker Spaniel",
    gener: "Female",
    type: "Spaniel",
    location: "Trại thú cưng Sun - Huế",
    image: imgURL.dogo,
  },
  {
    name: "Persian Cat",
    gener: "Female",
    type: "Cat",
    location: "Trại mèo Fluffy - Hà Nội",
    image: imgURL.dogo,
  },
  {
    name: "Persian Cat",
    gener: "Female",
    type: "Cat",
    location: "Trại mèo Fluffy - Hà Nội",
    image: imgURL.dogo,
  },
];

const shelterInfo = [
  {
    name: "Trại thú cưng ABC - Quận 12 TP. Hồ Chí Minh",
    location: "1234 Greenfield Avenue, Brooklyn, NY 11222",
    contact: "(+84) 0987656765",
    email: "test@gmail.com",
    ocTime: "08:00 - 16:00",
    cat: 12,
    dog: 22,
    image: imgURL.shelter,
  },
  {
    name: "Shelter for Stray Pets - District 1, HCMC",
    location: "789 Pet Lane, District 1, Ho Chi Minh City",
    contact: "(+84) 0123456789",
    email: "shelter1@gmail.com",
    ocTime: "09:00 - 17:30",
    cat: 12,
    dog: 22,
    image: imgURL.shelter,
  },
  {
    name: "Happy Paws Sanctuary - District 7, HCMC",
    location: "456 Sunshine Street, District 7, Ho Chi Minh City",
    contact: "(+84) 0976543210",
    email: "happypaws@gmail.com",
    ocTime: "07:30 - 15:30",
    cat: 12,
    dog: 22,
    image: imgURL.shelter,
  },
  {
    name: "Pet Haven - Da Nang",
    location: "321 Coastal Road, Da Nang",
    contact: "(+84) 0912345678",
    email: "pethaven@gmail.com",
    ocTime: "10:00 - 18:00",
    cat: 12,
    dog: 22,
    image: imgURL.shelter,
  },
  {
    name: "Rescue Animals Shelter - Hanoi",
    location: "654 Freedom Avenue, Hanoi",
    contact: "(+84) 0981234567",
    email: "rescuehanoi@gmail.com",
    ocTime: "08:30 - 16:30",
    cat: 12,
    dog: 22,
    image: imgURL.shelter,
  },
  {
    name: "Animal Welfare Center - Nha Trang",
    location: "987 Ocean Boulevard, Nha Trang",
    contact: "(+84) 0938765432",
    email: "animalwelfare@gmail.com",
    ocTime: "09:00 - 17:00",
    cat: 12,
    dog: 22,
    image: imgURL.shelter,
  },
];

const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <Header />
        <div
          className="hero-text"
          style={{ marginTop: "100px", marginLeft: "88px" }}
        >
          <Typography
            variant="body1"
            color="#103559"
            fontSize={60}
            fontWeight={700}
            fontFamily={"Montserrat"}
          >
            Find a Furry Friend
          </Typography>
          <Typography
            variant="body1"
            color="#103559"
            fontSize={46}
            fontWeight={600}
            fontFamily={"Montserrat"}
          >
            Make a Lifetime Bond!
          </Typography>
          <Typography
            variant="body1"
            color="#103559"
            sx={{ marginTop: "20px", width: "600px" }}
            fontSize={24}
            fontFamily={"Montserrat"}
          >
            Bringing a pet into your life means more love, laughter, and joy.
            With over 200+ pets waiting for a home, find your perfect companion
            today!
          </Typography>
          <Button
            sx={{
              bgcolor: "#103559",
              fontWeight: 600,
              borderRadius: 25,
              textTransform: "none",
              color: "white",
              p: "15px 35px",
              marginTop: "40px",
              width: "274px",
              fontFamily: "Montserrat",
            }}
          >
            Explore now
          </Button>
        </div>
        <CardMedia
          component={"img"}
          src={imgURL.hero}
          sx={{ width: "100%", position: "absolute", top: 0, zIndex: -1 }}
        />
      </div>
      <div
        className="pet-section"
        style={{ padding: "0 60px", marginTop: "240px", marginBottom: "60px" }}
      >
        <div
          className="pet-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="left">
            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{}}
              fontSize={16}
            >
              Find Your Perfect Companion Today
            </Typography>

            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{ mt: "5px" }}
              fontSize={24}
              fontWeight={600}
            >
              Join us in transforming the lives of abandoned pets
            </Typography>
          </div>
          <Button
            sx={{
              p: "15px 35px",
              border: "2px solid #103559",
              color: "#103559",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Montserrat",
              borderRadius: "25px",
            }}
          >
            View more
          </Button>
        </div>
        <div
          className="pet-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
            marginTop: "30px",
          }}
        >
          {petInfo.map((pet, index) => (
            <PetCard
              key={index}
              image={pet.image}
              name={pet.name}
              gender={pet.gener}
              type={pet.type}
              location={pet.location}
            />
          ))}
        </div>
      </div>
      <Banner />
      <div
        className="shelter-section"
        style={{ padding: "0 60px", marginTop: "60px", marginBottom: "60px" }}
      >
        <div
          className="shelter-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="left">
            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{}}
              fontSize={16}
            >
              Find a Safe Haven for Pets
            </Typography>

            <Typography
              variant="body1"
              color="#103559"
              fontFamily={"Montserrat"}
              sx={{ mt: "5px" }}
              fontSize={24}
              fontWeight={600}
            >
              Explore shelters near you and help transform the lives of
              abandoned animals.
            </Typography>
          </div>
          <Button
            sx={{
              p: "15px 35px",
              border: "2px solid #103559",
              color: "#103559",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Montserrat",
              borderRadius: "25px",
            }}
          >
            View more
          </Button>
        </div>
        <div
          className="shelter-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 17,
            marginTop: "30px",
          }}
        >
          {shelterInfo.map((s, index) => (
            <ShelterCard
              name={s.name}
              key={index}
              location={s.location}
              contact={s.contact}
              email={s.email}
              ocTime={s.ocTime}
              cat={s.cat}
              dog={s.dog}
              img={s.image}
            />
          ))}
        </div>
      </div>
      <Banner2 />
    </div>
  );
};

export default Home;
