import React from "react";

import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../GlobalProvider";

const DashboardLayout = () => {
  const { user } = useGlobalContext();
  return (
    <div style={{ backgroundColor: "#F2F2F7" }}>
      <AdminHeader />
      <div className="" style={{ display: "flex" }}>
        <AdminSideBar />
        <div
          className=""
          style={{
            marginLeft: "210px",
            marginTop: "100px",
            marginBottom: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
