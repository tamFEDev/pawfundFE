import React from "react";

import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ backgroundColor: "#F2F2F7", width: "100vw", height: "100%" }}>
      <AdminHeader />
      <div className="" style={{ display: "flex" }}>
        <AdminSideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
