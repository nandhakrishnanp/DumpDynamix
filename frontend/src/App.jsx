import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Components/login";
import Dashboard from "./Screen/Dashboard";
import Notification from "./Screen/Notification";
import LandingPage from "./Screen/LandingPage";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Components/Layout";
import Alerts from "./Screen/Alerts";
import Settings from "./Screen/Settings";
import Analytics from "./Screen/Analytics";
import TruckDetails from "./Screen/TruckDetails";
import Inventory from "./Screen/Inventory";
import Maps from "./Screen/Maps";
import Maintance from "./Screen/Maintance";
import CreateMaintance from "./Screen/CreateMaintance";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        limit={1}
        hideProgressBar={true}
        closeOnClick
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="home/:id" element={<TruckDetails />} />
          <Route path="notification" element={<Notification />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="maps" element={<Maps />} />
          <Route path="maintance" element={<Maintance />} />
          <Route path="maintance/new" element={<CreateMaintance/>} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
