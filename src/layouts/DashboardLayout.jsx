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
            marginLeft: user.roleId == 4 ? "210px" : "240px",
            marginTop: user.roleId == 4 ? "80px" : "100px",
            marginBottom: "30px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
