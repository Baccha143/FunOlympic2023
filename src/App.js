import React from "react";
import LoginForm from "./Components/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import OtpVerification from "./Components/OtpVerification";
import ResetPassword from "./Components/ResetPassword";
import ChangePassword from "./Components/ChangePassword";
import About from "./Components/Nav/About";
import Games from "./Components/Nav/Games/Games";
import Live from "./Components/Nav/Live";
import AdminLogin from "./Components/AdminLogin";
import Result from "./Components/Nav/Result";
import AdminDashboard from "./Components/AdminDashboard";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Login" element={<LoginForm />} />
          <Route exact path="/AdminLogin" element={<AdminLogin />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/OtpVerification" element={<OtpVerification />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route exact path="*" element={<Dashboard />} />
          <Route exact path="AdminDashboard" element={<AdminDashboard />} />
          <Route exact path="/ChangePassword" element={<ChangePassword />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Games" element={<Games />} />
          <Route exact path="/Live" element={<Live />} />
          <Route exact path="/Result" element={<Result />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
