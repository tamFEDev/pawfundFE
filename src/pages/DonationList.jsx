import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";

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
        await fetchUserInformation(res.data[0].userId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserInformation = async (userId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Admin/GetUserById?id=${userId}`
      );
      if (res.status == 200) {
        setUserInfo(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllDonations();
  }, []);

  return <div>{userInfo.fullname}</div>;
};

export default DonationList;
