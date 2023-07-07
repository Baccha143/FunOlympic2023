import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordChecklist from "react-password-checklist";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

export default function ChangePassword() {
  const [formValues, setFormValues] = useState({
    cupassword: "",
    password: "",
    cpassword: "",
  });

  const [type, setType] = useState("input");
  const showHide = (e) => {
    e.preventDefault();
    let currentType = type === "input" ? "password" : "input";
    setType(currentType);
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  let navigate = useNavigate();

  // eslint-disable-next-line
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const { cupassword, password, cpassword } = formValues;
    const response = await fetch("http://localhost:4000/api/auth/change", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, cpassword }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/Dashboard");
      alert("Password Changed Successfully !!!");
    } else if (cupassword === "") {
      alert("Please enter current password");
    } else {
      alert("Password Changed Successfully");
      navigate("/Dashboard");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
    // eslint-disable-next-line
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const pass = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/i;
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long";
    } else if (!pass.test(values.password)) {
      errors.password =
        "Password must contain atleast one uppercase, one lowercase, one number and one special character";
    }
    if (values.cpassword !== values.password) {
      errors.cpassword = "Password doesn't match";
    }

    if (isVerified) {
      console.log("Verification Done");
    } else {
      alert("Captcha verification needed");
      errors.recaptcha = "Captcha verification needed";
    }

    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen p-9 flex justify-center items-center font-serif">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-10 text-center rounded-lg w-96">
          <h1 className="text-3xl">Change Password</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="my-2 text-justify">
              <label className="text-lg ">Current Password:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 h-7 pl-2"
                name="cupassword"
                type={type}
                value={formValues.cupassword}
                onChange={handleChange}
                id="cupassword"
              />
            </div>
            <div className="my-2 text-justify">
              <label className="text-lg ">New Password:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 h-7 pl-2"
                name="password"
                type={type}
                value={formValues.password}
                onChange={handleChange}
                id="password"
              />
              <button
                className="bg-blue-300 mt-2 px-2 rounded-lg hover:bg-green-500"
                onClick={showHide}
              >
                {type === "input" ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <p className="text-red-500">{formErrors.password}</p>
            <div className="my-2 text-justify">
              <label className="text-lg ">Confirm New Password:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 h-7 pl-2"
                name="cpassword"
                type={type}
                value={formValues.cpassword}
                onChange={handleChange}
                id="cpassword"
              />
            </div>
            <p className="text-red-500">{formErrors.cpassword}</p>

            <ReCAPTCHA
              sitekey="6LdPIdwkAAAAAPCuAt41H2CHDhesT3L12S72Xgqm"
              onChange={handleVerify}
              className="mt-4"
            />

            <Link to="/Dashboard">
              <button className="bg-blue-300 mt-4 px-3 py-1 rounded-lg hover:bg-red-600 mx-5">
                Back
              </button>
            </Link>

            <button
              className="bg-blue-300 mt-4 px-3 py-1 rounded-lg hover:bg-green-500 mx-5"
              type="submit"
            >
              Submit
            </button>
            <PasswordChecklist
              className="text-left"
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={8}
              value={formValues.password}
              onChange={(isValid) => {}}
            />
          </form>
        </div>
      </div>
    </>
  );
}
