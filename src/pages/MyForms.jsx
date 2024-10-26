import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomDivider from "../components/CustomDivider";
import { fontFamily, imgURL } from "../constants";
import AdoptionFormCard from "../components/AdoptionFormCard";
import { useGlobalContext } from "../GlobalProvider";

const data = [
  {
    petName: "Shiba Milo",
    submitDate: "12/12/2023",
    petImg: "imgURL.shiba",
    status: "Pending",
    adoptReason: "Cuz I want to get a pet",
    introduction: "Hello, I'm excited to adopt Milo!",
    havePetBefore: false,
    declineReason: "",
  },
  {
    petName: "Golden Max",
    submitDate: "10/10/2023",
    petImg: "imgURL.golden",
    status: "Approved",
    adoptReason: "I love Golden Retrievers and have space for one.",
    introduction: "Hi, Max will be a perfect fit for my family.",
    havePetBefore: true,
    declineReason: "",
  },
  {
    petName: "Persian Bella",
    submitDate: "11/11/2023",
    petImg: "imgURL.persian",
    status: "Rejected",
    adoptReason: "I want a calm and friendly cat.",
    introduction: "Hello, I adore Persian cats and have experience.",
    havePetBefore: true,
    declineReason: "Already adopted by someone else",
  },
  {
    petName: "Beagle Buddy",
    submitDate: "09/25/2023",
    petImg: "imgURL.beagle",
    status: "Pending",
    adoptReason: "Looking for a playful companion.",
    introduction: "Hi, Buddy would make a great addition to my home.",
    havePetBefore: false,
    declineReason: "",
  },
  {
    petName: "Bulldog Rocky",
    submitDate: "08/15/2023",
    petImg: "imgURL.bulldog",
    status: "Rejected",
    adoptReason: "I love Bulldogs, and I am ready to take care of one.",
    introduction: "Hi, Rocky seems like a perfect match for me.",
    havePetBefore: false,
    declineReason: "Does not meet home requirements",
  },
];

const MyForms = () => {
  const { user, token } = useGlobalContext();
  useEffect(() => {
    console.log({ user: user, token: token });
  });
  return (
    <Card sx={{ width: "1500px", p: "30px 30px" }}>
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
        style={{ display: "flex", flexWrap: "wrap", gap: 30 }}
      >
        {data.map((d, index) => (
          <AdoptionFormCard
            key={index}
            name={d.petName}
            submitDate={d.submitDate}
            petImg={d.petImg}
            status={d.status}
            adoptReason={d.adoptReason}
            introduction={d.introduction}
            havePetBefore={d.havePetBefore}
            declineReason={d.declineReason}
          />
        ))}
      </div>
    </Card>
  );
};

export default MyForms;
