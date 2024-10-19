import { imgURL } from "../constants";
import ShelterCard from "./ShelterCard";

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
const ShelterList = ({ mb }) => {
  return (
    <div
      className="shelter-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 17,
        marginTop: "30px",
        justifyContent: "center",
        marginBottom: mb,
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
  );
};

export default ShelterList;
