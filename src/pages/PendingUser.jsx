import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import axios from "axios";
import { BASE_URL, fontFamily } from "../constants";
import { useGlobalContext } from "../GlobalProvider";

const PendingUser = () => {
  const [data, setData] = useState([]); // Holds fetched user data
  const { token } = useGlobalContext(); // Fetch token from the global context
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch all user requests
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/Manager/list-pending-requests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setData(res.data); // Update user data
      }
    } catch (err) {
      console.error("Error fetching user requests:", err);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Function to approve a specific user
  const approveUser = async (approveId) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/Manager/approve-user/${approveId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert(`User with ID ${approveId} approved successfully!`);
        fetchAllUsers(); // Refresh the list after approval
      }
    } catch (err) {
      console.error("Error approving user:", err);
      alert("Failed to approve user. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div
      className="authorize-users"
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        User Authorization Requests
      </Typography>

      {loading ? (
        <Typography
          variant="body1"
          color="initial"
          fontFamily={fontFamily.msr}
          fontSize={20}
          fontWeight={600}
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
          }}
        >
          Loading user requests...
        </Typography>
      ) : data.length === 0 ? (
        <Typography
          variant="body1"
          color="initial"
          fontFamily={fontFamily.msr}
          fontSize={20}
          fontWeight={600}
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <PetsIcon />
            No user requests found
          </div>
          <Typography
            variant="body1"
            color="#667479"
            fontSize={16}
            fontWeight={400}
            fontFamily={fontFamily.msr}
            sx={{ marginTop: "10px" }}
          >
            It seems there are no pending user authorization requests at the
            moment.
          </Typography>
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>ID Card Number</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {data.map((user, index) => (
    <TableRow key={index}>
      <TableCell>{user.userId}</TableCell>
      <TableCell>{user.name || "N/A"}</TableCell>
      <TableCell>{user.address || "N/A"}</TableCell>
      <TableCell>{user.phoneNumber || "N/A"}</TableCell>
      <TableCell>{user.occupation || "N/A"}</TableCell>
      <TableCell>{user.idCardNumber || "N/A"}</TableCell>
      <TableCell>{user.isApprovedUser ? "Yes" : "No"}</TableCell>
      <TableCell>
        {user.isApprovedUser ? (
          <Typography
            variant="body2"
            color="textSecondary"
            fontFamily={fontFamily.msr}
          >
            Already Approved
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => approveUser(user.approveId)}
          >
            Approve
          </Button>
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      )}
    </div>
  );
};

export default PendingUser;
