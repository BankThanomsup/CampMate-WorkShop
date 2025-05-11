import Layout from "@/Layouts/Layout";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import About from "@/pages/About";
import Camping from "@/pages/admin/Camping";
import Dashboard from "@/pages/admin/Dashboard";
import Manage from "@/pages/admin/Manage";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/user/Profile";
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import CampingDetail from "@/pages/user/CampingDetail";
import ProtectRoute from "./ProtectRoute";
import Checkout from "@/pages/user/Checkout";
import CheckoutComplete from "@/pages/user/CheckoutComplete";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* {Public} */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

      {/* {Private User} */}
        <Route path="user" element={<Layout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="camping/:id" element={<CampingDetail />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="complete/:session" element={<CheckoutComplete />} />
          
        </Route>




        {/* {Private Admin} */}
        <Route path="admin" element={<ProtectRoute el={<LayoutAdmin />}/>}>
          <Route index element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
          <Route path="camping" element={<Camping />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
