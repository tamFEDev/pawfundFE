import { Card, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDivider from "../components/CustomDivider";
import { BASE_URL, fontFamily, imgURL } from "../constants";
import AdoptionFormCard from "../components/AdoptionFormCard";
import { useGlobalContext } from "../GlobalProvider";
import axios from "axios";
import PetsIcon from "@mui/icons-material/Pets";

const MyDonations = () => {
  const { user, token, loading, setLoading } = useGlobalContext();
  const [donations, setDonations] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/Transaction/shelter-transactions-by-user?userId=${user.userId}`
      );
      if (res.status == 200) {
        setDonations(res.data);
        const total = res.data.reduce((sum, donation) => {
          return sum + (donation.transactionAmount || 0);
        }, 0);

        setTotalDonation(total);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const formatReadableDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card sx={{ width: "1600px", p: "30px 30px" }}>
      <Typography
        variant="body1"
        color="initial"
        fontSize={24}
        fontWeight={600}
        fontFamily={fontFamily.msr}
      >
        My Donations
      </Typography>
      <CustomDivider padding={"20px 0"} />
      <div className="donations" style={{ display: "flex", gap: 100 }}>
        <div className="overall">
          <Typography
            variant="body1"
            color="initial"
            fontSize={18}
            fontWeight={600}
            fontFamily={fontFamily.msr}
            sx={{ mb: "15px" }}
          >
            Overall Donation
          </Typography>
          <div
            className="total-donation"
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #667479",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              fontFamily={fontFamily.msr}
              fontSize={20}
              fontWeight={600}
            >
              Total Donations
            </Typography>
            <Typography
              variant="body1"
              color="#103559"
              fontFamily={fontFamily.msr}
              fontSize={24}
              fontWeight={700}
              sx={{ mt: "5px" }}
            >
              {`${totalDonation.toLocaleString()} đ`}
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontSize={14}
            >
              The total amount you have donated so far.
            </Typography>
          </div>
          <div
            className="donation-counter"
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #667479",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              fontFamily={fontFamily.msr}
              fontSize={20}
              fontWeight={600}
            >
              Donations Counter
            </Typography>
            <Typography
              variant="body1"
              color="#103559"
              fontFamily={fontFamily.msr}
              fontSize={24}
              fontWeight={700}
              sx={{ mt: "5px" }}
            >
              {donations.length} donations
            </Typography>
            <Typography
              variant="body1"
              color="#667479"
              fontFamily={fontFamily.msr}
              fontSize={14}
            >
              The total number of donations you have made so far.
            </Typography>
          </div>
        </div>
        <div className="history">
          <Typography
            variant="body1"
            color="initial"
            fontSize={18}
            fontWeight={600}
            fontFamily={fontFamily.msr}
            sx={{ mb: "15px" }}
          >
            Donation History
          </Typography>
          <div
            className="history-container modal-content"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              height: "400px",
              overflowY: loading || donations.length < 3 ? "hidden" : "scroll",
              paddingBottom: "20px",
            }}
          >
            {donations.map((d, index) => (
              <div
                className=""
                key={index}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #667479",
                  padding: "20px",
                }}
              >
                <div
                  className=""
                  style={{
                    display: "flex",
                    gap: 50,
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className=""
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {/* <CardMedia
                      src={d.shelter.shelterImage}
                      component={"img"}
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "10px",
                      }}
                    /> */}
                    <PetsIcon fontSize="large" />
                    <div className="middle" style={{ marginLeft: "15px" }}>
                      <Typography
                        variant="body1"
                        color="initial"
                        fontSize={20}
                        fontWeight={600}
                        fontFamily={fontFamily.msr}
                      >
                        {d.shelter.shelterName}
                      </Typography>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="#667479"
                          fontSize={14}
                          fontFamily={fontFamily.msr}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {new Date(d.transactionDate).toLocaleTimeString()}
                          <div
                            className="circle"
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "10000px",
                              backgroundColor: "#667479",
                            }}
                          ></div>
                          {formatReadableDate(d.transactionDate)}
                        </Typography>
                      </div>
                      <div
                        className=""
                        style={{ display: "flex", gap: 5, marginTop: "5px" }}
                      >
                        <Typography
                          variant="body1"
                          color="#667479"
                          fontFamily={fontFamily.msr}
                          fontSize={14}
                        >
                          Message:{" "}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          fontFamily={fontFamily.msr}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {d.note}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Typography
                      variant="body1"
                      color="#103559"
                      fontFamily={fontFamily.msr}
                      fontSize={18}
                      fontWeight={600}
                      textAlign={"right"}
                    >
                      {`${d.transactionAmount.toLocaleString()} đ`}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#667479"
                      fontFamily={fontFamily.msr}
                      fontSize={14}
                      textAlign={"right"}
                    >
                      Credit Card
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyDonations;
