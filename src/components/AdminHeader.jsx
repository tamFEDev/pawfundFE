import { CardMedia, IconButton, Typography } from "@mui/material";
import { fontFamily, imgURL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalProvider";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminHeader = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        backgroundColor: "white",
      }}
    >
      <CardMedia component={"img"} src={imgURL.logo} sx={{ width: "179px" }} />

      <Typography
        variant="body1"
        color="initial"
        fontFamily={fontFamily.msr}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        Welcome {user.role === "staff" ? "Shelter Staff" : "Admin"},{" "}
        <div
          className=""
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <Typography
            variant="body1"
            color="initial"
            fontWeight={600}
            fontFamily={fontFamily.msr}
          >
            {user.email}
          </Typography>
          <IconButton onClick={() => navigate("/account/profile")}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </div>
      </Typography>
    </div>
  );
};

export default AdminHeader;
