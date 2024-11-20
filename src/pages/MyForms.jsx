import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { BASE_URL, fontFamily } from "../constants";
import AdoptionFormCard from "../components/AdoptionFormCard";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";

const MyForms = () => {
  const { token } = useGlobalContext();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/Adoption/user-adoption-requests`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data);
          setForms(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchForms();
  }, []);

  return (
    <Card sx={{ width: "1600px", p: "30px 30px" }}>
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        My Adoption Forms
      </Typography>
      <CustomDivider padding={"20px 0"} />
      <div
        className="card-container"
        style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
      >
        {forms.map((d, index) => (
          <AdoptionFormCard
            key={index}
            name={d.petName}
            petId={d.petId}
            // submitDate={d.submitDate}
            // petImg={d.petImg}
            isApproved={d.isApproved}
            adoptReason={d.reasonForAdopting}
            introduction={d.selfDescription}
            havePetBefore={d.hasPetExperience}
            // declineReason={d.declineReason}
            createDate={d.createDate}
            reasonForm={d.reason}
          />
        ))}
      </div>
    </Card>
  );
};

export default MyForms;
