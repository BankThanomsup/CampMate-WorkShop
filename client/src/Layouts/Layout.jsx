import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main className="container min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      {/* <hr /> */}
      <div className="py-6">
        <Outlet />
      </div>
    </main >
  );
};

export default Layout;
