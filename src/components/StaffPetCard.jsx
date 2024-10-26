import { Button, Card, CardMedia, Typography } from "@mui/material";
import { fontFamily } from "../constants";
import { useNavigate } from "react-router-dom";
import CustomChip from "./CustomChip";

const StaffPetCard = ({ name, gender, type, location, image, key }) => {
  const navigate = useNavigate();
  return (
    <Card key={key} sx={{ p: "15px", width: "300px", borderRadius: "20px" }}>
      <CardMedia component={"img"} src={image} sx={{ width: "300px" }} />
      <div className="card-content" style={{ marginTop: "20px" }}>
        <Typography
          variant="body1"
          color="initial"
          fontSize={16}
          fontWeight={600}
          fontFamily={"Montserrat"}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          {name}
          <CustomChip
            title={`dogs`}
            color={"#FFB775"}
            bgColor={"rgb(255,183,117,0.1)"}
            fontSize={12}
            fontWeight={600}
          />
        </Typography>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "10px 0",
          }}
        >
          <Typography
            variant="body1"
            color="#667479"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            fontSize={12}
            fontFamily={"Montserrat"}
          >
            Gender:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={"Montserrat"}
              fontSize={12}
              fontWeight={600}
            >
              {gender}
            </Typography>
          </Typography>
          <div
            className="circle"
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "10000px",
              backgroundColor: "#667479",
            }}
          ></div>
          <Typography
            variant="body1"
            color="#667479"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            fontFamily={"Montserrat"}
            fontSize={12}
          >
            Type:{" "}
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontWeight={600}
              fontSize={12}
            >
              {type}
            </Typography>
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="#667479"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          fontFamily={fontFamily.msr}
          fontSize={12}
        >
          Have been staying for:{" "}
          <Typography
            variant="body1"
            color="#667479"
            fontFamily={fontFamily.msr}
            fontSize={12}
            fontWeight={600}
          >
            50 days
          </Typography>
        </Typography>
      </div>
      <Button
        sx={{
          width: "100%",
          bgcolor: "#103559",
          borderRadius: "25px",
          fontWeight: 600,
          color: "white",
          textTransform: "none",
          marginTop: "24px",
          fontFamily: fontFamily.msr,
        }}
        // onClick={() => navigate("/adoption/id")}
      >
        Update pet
      </Button>
    </Card>
  );
};

export default StaffPetCard;
