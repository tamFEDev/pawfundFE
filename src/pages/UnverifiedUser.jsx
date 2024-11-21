import React, { useEffect, useState } from "react";
import { BASE_URL, fontFamily } from "../constants";
import axios from "axios";
import {
  Button,
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

const UnverifiedUser = () => {
  const [users, setUsers] = useState([]);
  const [userFullNames, setUserFullNames] = useState({}); // Store full names by userId

  const getUserFullName = async (id) => {
    try {
      if (userFullNames[id]) return; // Avoid redundant API calls if already fetched

      const res = await axios.get(`${BASE_URL}/api/Admin/GetUserById?id=${id}`);
      if (res.status === 200) {
        setUserFullNames((prev) => ({ ...prev, [id]: res.data.fullname }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/get-pending-approve-requests-list`
      );
      if (res.status === 200) {
        const unapprovedUsers = res.data.data.filter(
          (user) => user.isApprovedUser === false
        );
        setUsers(unapprovedUsers);
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

  const handleVerify = () => {};

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  useEffect(() => {
    // Fetch full names for all users once `users` are loaded
    users.forEach((user) => getUserFullName(user.userId));
  }, [users]);

  return (
    <div
      style={{
        padding: "20px 20px",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "1238px",
        height: "532px",
      }}
    >
      <Typography
        variant="body1"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        Pending Verification Request
      </Typography>
      <CustomDivider padding={"20px 0"} />
      {users.length === 0 ? (
        <Typography
          variant="body1"
          fontSize={30}
          fontWeight={600}
          fontFamily={fontFamily.msr}
          textAlign="center"
        >
          No users found
        </Typography>
      ) : (
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
                  Contact
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                    // fontSize: 16,
                  }}
                >
                  Occupation
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                    // fontSize: 16,
                  }}
                >
                  ID Card
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                    // fontSize: 16,
                  }}
                >
                  Place of issue
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                    // fontSize: 16,
                  }}
                >
                  Permanent Address
                </TableCell>
                {/* <TableCell
                  align="left"
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                    // fontSize: 16,
                  }}
                >
                  Request Date
                </TableCell> */}
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: fontFamily.msr,
                    fontWeight: 600,
                    // fontSize: 16,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
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
                    {userFullNames[row.userId] || "Loading..."}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: fontFamily.msr,
                    }}
                  >
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: fontFamily.msr,
                    }}
                  >
                    {row.occupation}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: fontFamily.msr,
                    }}
                  >
                    {row.idCardNumber}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: fontFamily.msr,
                    }}
                  >
                    {row.placeGet}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: fontFamily.msr,
                      maxWidth: 250, // Set your desired width limit
                      whiteSpace: "nowrap", // Prevent text from wrapping
                      overflow: "hidden", // Hide overflow content
                      textOverflow: "ellipsis", // Add ellipsis (...) for overflow text
                    }}
                  >
                    {row.usualAddress}
                  </TableCell>

                  {/* <TableCell
                    align="left"
                    sx={{
                      fontFamily: fontFamily.msr,
                    }}
                  >
                    {formatReadableDate(row.dateGet)}
                  </TableCell> */}
                  <TableCell align="center">
                    <Button
                      sx={{
                        color: "rgb(92, 184, 92)",
                        fontFamily: fontFamily.msr,
                        bgcolor: "rgb(92, 184, 92, 0.1)",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "10px",
                        // p: "12px 20px",
                      }}
                      onClick={() => handleVerify()}
                    >
                      Approve
                    </Button>
                    {/* <Button>Reject</Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UnverifiedUser;
