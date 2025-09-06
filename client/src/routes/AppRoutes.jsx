import Layout from "@/Layouts/Layout";
import LayoutAdmin from "@/Layouts/LayoutAdmin";
import About from "@/pages/About";
import Camping from "@/pages/admin/Camping";
import CampingManagement from "@/pages/admin/CampingManagement";
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
import MyOrders from "@/pages/user/MyOrders";
import MyFavorites from "@/pages/user/MyFavorites";
import MyReservations from "@/pages/user/MyReservations";
import MyCampings from "@/pages/user/MyCampings";

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
          <Route path="myorders" element={<MyOrders />} />
          <Route path="my-favorites" element={<MyFavorites />} />
          <Route path="my-reservations" element={<MyReservations />} />
          <Route path="my-campings" element={<MyCampings />} />
        </Route>

        {/* {Admin Camping - Available for all logged in users} */}
        <Route path="admin" element={<ProtectRoute el={<Layout />}/>}>
          <Route path="camping" element={<Camping />} />
        </Route>

        {/* {Private Admin Only} */}
        <Route path="admin" element={<ProtectRoute el={<LayoutAdmin />}/>}>
          <Route index element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
        </Route>

        {/* {Admin Routes with Layout and access control} */}
        <Route path="admin" element={<Layout />}>
          <Route path="camping-management" element={<CampingManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
