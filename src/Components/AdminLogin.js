import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [creds, setCreds] = useState({ phone: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: creds.phone, password: creds.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/OtpVerification", { replace: true });
    } else if ((creds.phone === "", creds.password === "")) {
      alert("Please enter both fields");
    } else {
      alert("Invalid phone or password");
    }
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center font-serif">
        <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-10 text-center rounded-lg w-96 border-2 h-auto">
          <h1 className="text-3xl">Admin Login</h1> <hr />
          <form onSubmit={handleSubmit}>
            <div className=" my-2 text-justify">
              <label className="text-lg">Phone:</label>
              <br />
              <input
                className="bg-blue-300 rounded-md w-72 text-sm h-7 pl-2"
                type="phone"
                id="phone"
                name="phone"
                value={creds.phone}
                onChange={onChange}
              />
            </div>
            <div className="my-2 text-justify">
              <label className="text-lg ">Password:</label>
              <br />
              <input
                className="bg-blue-300 rounded-md w-72 h-7 pl-2"
                type="password"
                name="password"
                id="password"
                value={creds.password}
                onChange={onChange}
              />
              <Link className="mt-2" to="/ResetPassword">
                Forget Password ?
              </Link>
            </div>
            <button
              className="bg-blue-300 mt-4 px-3 py-1 mx-4 rounded-lg hover:bg-emerald-400"
              type="submit"
            >
              Login
            </button>
            <Link to="/Login">
              <button className="bg-blue-300 mt-4 px-3 py-1 rounded-lg hover:bg-emerald-400">
                User Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
