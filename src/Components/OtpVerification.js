import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [creds, setCreds] = useState({ otp: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: creds.otp }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      alert("Login Successful");

      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/AdminDashboard", { replace: true });
    } else if (creds.otp === "") {
      alert("Please enter OTP");
    } else {
      alert("Invalid OTP");
    }
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center font-serif">
        <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-10 text-center rounded-lg w-96 border-2 h-auto">
          <h1 className="text-3xl">Enter OTP</h1> <hr />
          <form onSubmit={handleSubmit}>
            <div className="my-2 text-justify">
              <input
                className="bg-blue-300 rounded-md w-72 h-7 pl-2"
                type="number"
                name="otp"
                id="otp"
                value={creds.otp}
                onChange={onChange}
                maxLength={6}
              />
            </div>
            <button
              className="bg-blue-300 mt-4 px-3 py-1 rounded-lg hover:bg-emerald-400"
              type="submit"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
