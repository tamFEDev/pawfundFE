import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomDivider from "../components/CustomDivider";

const DonationList = () => {
  const { user } = useGlobalContext();
  const [donations, setDonations] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const fetchAllDonations = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Transaction/shelter-transactions?userId=${user.userId}`
      );
      if (res.status == 200) {
        setDonations(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatReadableDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchAllDonations();
  }, []);

  return (
    <div
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        padding: "20px 20px",
        // display: "inline-block",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1250px",
        height: "566px",
      }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize={24}
          fontWeight={600}
          fontFamily={fontFamily.msr}
        >
          Donation List for Shelter
        </Typography>
      </div>
      <CustomDivider padding={"20px 0"} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ padding: "20px 0" }}>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  fontFamily: fontFamily.msr,
                  fontWeight: 600,
                  // fontSize: 16,
                }}
              >
                UserID
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: fontFamily.msr,
                  fontWeight: 600,
                  // fontSize: 16,
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: fontFamily.msr,
                  fontWeight: 600,
                  // fontSize: 16,
                }}
              >
                Full Name
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: fontFamily.msr,
                  fontWeight: 600,
                  // fontSize: 16,
                }}
              >
                Amount (đ)
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: fontFamily.msr,
                  fontWeight: 600,
                  // fontSize: 16,
                }}
              >
                Message
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: fontFamily.msr,
                  fontWeight: 600,
                  // fontSize: 16,
                }}
              >
                Transation Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((row) => (
              <TableRow
                key={row.userId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                  }}
                >
                  {row.userId}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                    maxWidth: 160, // Set your desired width limit
                    whiteSpace: "nowrap", // Prevent text from wrapping
                    overflow: "hidden", // Hide overflow content
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                  }}
                >
                  {row.fullName}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                  }}
                >
                  {`${row.transactionAmount.toLocaleString()}`}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                  }}
                >
                  {row.note}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: fontFamily.msr,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {formatReadableDate(row.transactionDate)}
                  <div
                    className="circle"
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "10000px",
                      backgroundColor: "#667479",
                    }}
                  ></div>
                  {new Date(row.transactionDate).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DonationList;
