import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useLocation } from "react-router-dom";
import { fontFamily } from "../constants";

const DonationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract vnp_Amount from URL
  const searchParams = new URLSearchParams(location.search);
  const vnpAmount = searchParams.get("vnp_Amount");

  const handleGoToHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleViewDonations = () => {
    navigate("/my-donations"); // Navigate to user's donation history page
  };

  return (
    <Container maxWidth="sm">
      <Card elevation={3} sx={{ mt: 5, p: 4 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "#4caf50", mb: 2 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              fontFamily={fontFamily.msr}
            >
              Thank You for Your Donation!
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              textAlign="center"
              sx={{ mt: 2 }}
              fontFamily={fontFamily.msr}
            >
              Your donation of {Number(vnpAmount).toLocaleString()} VND has been
              successfully processed. Thank you for supporting the shelter!
            </Typography>
            <Button
              variant="contained"
              // color="primary"
              fullWidth
              sx={{
                mt: 4,P
                fontFamily: fontFamily.msr,
                bgcolor: "#103559",
                // textTransform: "none",
              }}
              onClick={handleGoToHome}
            >
              Go to Homepage
            </Button>
            <Button
              variant="outlined"
              color="#103559"
              fullWidth
              sx={{
                mt: 2,
                fontFamily: fontFamily.msr,
                border: "1px solid #103559",
              }}
              onClick={handleViewDonations}
            >
              View My Donations
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DonationSuccess;
