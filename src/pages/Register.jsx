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
import { BASE_URL, fontFamily, imgURL } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
    confirmPassword: "",
    fullName: "",
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

  const handleRegister = async () => {
    const body = {
      username: form.email,
      fullname: form.fullName,
      email: form.email,
      phoneNumber: "",
      address: "",
      password: form.password,
    };
    try {
      const res = await axios.post(`${BASE_URL}/api/Auth/Register`, body);
      console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
                sx={{ width: "530px", borderRadius: "15px", height: "100%" }}
              />
            </Grid2>
            <Grid2 sx={{ width: "400px" }}>
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

              <div className="full-name" style={{ marginTop: "25px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontFamily={fontFamily.msr}
                >
                  Full name
                </Typography>
                <OutlinedInput
                  id=""
                  placeholder="Enter your full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => handleInputChange(e)}
                  sx={{
                    borderRadius: "15px",
                    marginTop: "12px",
                    fontFamily: fontFamily.msr,
                  }}
                  fullWidth
                />
              </div>
              <div className="email-input" style={{ marginTop: "20px" }}>
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
              <div className="password-input" style={{ marginTop: "20px" }}>
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
              <div className="password-input" style={{ marginTop: "20px" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontFamily={fontFamily.msr}
                >
                  Confirm password
                </Typography>
                <OutlinedInput
                  id=""
                  placeholder="Re-enter your password"
                  name="confirmPassword"
                  value={form.confirmPassword}
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
                onClick={() => handleRegister()}
              >
                Register
              </Button>
              <Typography
                variant="body1"
                color="initial"
                fontSize={16}
                textAlign={"center"}
                sx={{ marginTop: "15px" }}
                fontFamily={fontFamily.msr}
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  sx={{
                    cursor: "pointer",
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                  }}
                >
                  Login now!
                </Link>
              </Typography>
            </Grid2>
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default Register;
