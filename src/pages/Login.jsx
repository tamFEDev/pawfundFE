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
  Snackbar,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { fontFamily, imgURL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalProvider";

const Login = () => {
  const { user, login, loading, setLoading, isLogged } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [info, setInfo] = useState({
    isError: false,
    message: "",
  });

  const [alert, setAlert] = useState(false);

  const handleClose = () => {
    setAlert(false);
  };

  const handleOpen = () => {
    setAlert(true);
  };

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
    setLoading(true);
    try {
      const body = {
        email: form.email,
        password: form.password,
      };
      const result = await login(body);

      if (result && result.error) {
        setInfo({
          isError: true,
          message: result.error,
        });
      } else if (result) {
        setInfo({
          isError: false,
          message: "Login successful! Please wait...",
        });
      } else {
        setInfo({
          isError: true,
          message: "Invalid email or password! Please try again",
        });
      }
      handleOpen();
    } catch (err) {
      console.log("Login failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to redirect based on user role once user data is available
  useEffect(() => {
    if (user?.roleId && isLogged) {
      const timer = setTimeout(() => {
        switch (user.roleId) {
          case 4:
            navigate("/dashboard/staff/about-shelter");
            break;
          case 2:
            navigate("/");
            break;
          case 3:
            navigate("/dashboard/manager/pet-management");
            break;
        }
      }, 1000); // Delay the navigation by 2 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [user, isLogged, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [form]);

  return (
    <div style={{}}>
      <Snackbar
        open={alert} // Use 'alert' state to control visibility
        autoHideDuration={info.isError ? 2000 : 1000} // Automatically closes after 3 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={info.isError ? "error" : "success"} // Corrected spelling of "success"
          sx={{ width: "100%" }}
        >
          {info.message}
        </Alert>
      </Snackbar>

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
                  backgroundColor: !loading && "#FFAD6B",
                  color: "white",
                  fontWeight: 600,
                  width: "100%",
                  py: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontFamily: fontFamily.msr,
                }}
                disabled={loading}
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
