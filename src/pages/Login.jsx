import { useEffect, useState } from "react";
import {
  CardMedia,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
  Link,
  Grid2,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { fontFamily, imgURL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalProvider";

const Login = () => {
  const { user, login, loading, setLoading } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Start loading when login is initiated
    try {
      const body = {
        email: form.email,
        password: form.password,
      };
      await login(body);
    } catch (err) {
      console.log("Login failed: ", err);
    } finally {
      setLoading(false); // Stop loading after login completes
    }
  };

  // Use useEffect to redirect based on user role once user data is available
  useEffect(() => {
    if (user?.roleName && !loading) {
      // Ensure user is defined and loading has stopped
      switch (user.roleName) {
        case "Staff":
          navigate("/dashboard/staff/about-shelter");
          break;
        case "User":
          navigate("/");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [user, loading, navigate]); // Depend on user and loading states

  return (
    <div style={{}}>
      <div
        className="login-body"
        style={{
          backgroundColor: "#FCEED5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          className="login-container"
          style={{
            backgroundColor: "white",
            position: "absolute",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <Grid2 container gap={10}>
            <Grid2 sx={{}}>
              <CardMedia
                component={"img"}
                src={imgURL.shiba}
                sx={{ width: "470px", borderRadius: "15px" }}
              />
            </Grid2>
            <Grid2
              sx={{
                width: "400px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                color="initial"
                fontSize={24}
                sx={{ display: "flex", gap: 1, marginTop: 8, marginLeft: 5 }}
                fontFamily={fontFamily.msr}
              >
                Welcome to
                <Typography
                  variant="body1"
                  color="initial"
                  fontWeight={600}
                  fontSize={24}
                  fontFamily={fontFamily.msr}
                >
                  PawFund
                </Typography>
              </Typography>

              <div className="email-input" style={{ marginTop: "25px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontFamily={fontFamily.msr}
                >
                  Email
                </Typography>
                <OutlinedInput
                  id=""
                  placeholder="Enter your email"
                  name="email"
                  value={form.email}
                  onChange={(e) => handleInputChange(e)}
                  sx={{
                    borderRadius: "12px",
                    marginTop: "12px",
                    fontFamily: fontFamily.msr,
                  }}
                  fullWidth
                />
              </div>
              <div className="password-input" style={{ marginTop: "30px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontFamily={fontFamily.msr}
                >
                  Password
                </Typography>
                <OutlinedInput
                  id=""
                  placeholder="Enter your password"
                  name="password"
                  value={form.password}
                  onChange={(e) => handleInputChange(e)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: "15px",
                    marginTop: "12px",
                    fontFamily: fontFamily.msr,
                  }}
                  fullWidth
                />
              </div>
              <Button
                sx={{
                  marginTop: "30px",
                  borderRadius: "10px",
                  backgroundColor: "#FFAD6B",
                  color: "white",
                  fontWeight: 600,
                  width: "100%",
                  py: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontFamily: fontFamily.msr,
                }}
                onClick={() => handleLogin()}
              >
                Login
              </Button>
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                textAlign={"center"}
                sx={{ marginTop: "15px" }}
                fontFamily={fontFamily.msr}
              >
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  sx={{
                    cursor: "pointer",
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                  }}
                >
                  Register now!
                </Link>
              </Typography>
            </Grid2>
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default Login;
