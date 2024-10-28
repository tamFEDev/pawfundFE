import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalProvider";
import { CardMedia, IconButton, Typography } from "@mui/material";
import { fontFamily, imgURL } from "../constants";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminHeader = () => {
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px",
        backgroundColor: "white",
        position: "fixed",
        width: "1480px",
        zIndex: 2,
      }}
    >
      <CardMedia component={"img"} src={imgURL.logo} sx={{ width: "179px" }} />

      {user ? (
        <Typography
          variant="body1"
          color="initial"
          fontFamily={fontFamily.msr}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Welcome {user.roleId === 4 ? "Shelter Staff" : "Manager"},{" "}
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
            <IconButton onClick={() => handleLogout()}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </div>
        </Typography>
      ) : (
        <Typography variant="body1" fontFamily={fontFamily.msr}>
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default AdminHeader;
