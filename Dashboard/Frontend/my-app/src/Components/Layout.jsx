// import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full mr-16 md:mr-56">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
