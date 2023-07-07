import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import PasswordStrengthBar from "react-password-strength-bar";

export default function SignUp() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    recaptcha: "",
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

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const { username, email, phone, password, cpassword } = formValues;
    const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, phone, password, cpassword }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      // Handle success case
    }
    console.log(json);
    if (json.success) {
      alert("Resgistered successfully");
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/LoginForm");
    } else {
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pass = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email!";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    }
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-auto p-9 flex justify-center items-center font-serif">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-10 text-center rounded-lg w-96">
          <h1 className="text-3xl">Create New account</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className=" my-2 text-justify">
              <label className="text-lg">Username:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 text-sm h-7 pl-2"
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                id="username"
              />
            </div>
            <p className="text-red-500">{formErrors.username}</p>
            <div className=" my-2 text-justify">
              <label className="text-lg">Email:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 text-sm h-7 pl-2"
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                id="email"
              />
            </div>
            <p className="text-red-500">{formErrors.email}</p>

            <div className=" my-2 text-justify">
              <label className="text-lg">Phone:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 text-sm h-7 pl-2"
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                id="phone"
                placeholder="Please enter dialing code (e.g. +977)"
              />
            </div>
            <p className="text-red-500">{formErrors.phone}</p>
            {error && <p className="text-red-500">{error}</p>}

            <div className="my-2 text-justify">
              <label className="text-lg ">Password:</label>
              <br />
              <input
                className="bg-slate-200 rounded-md w-72 h-7 pl-2"
                name="password"
                type={type}
                value={formValues.password}
                onChange={handleChange}
                id="password"
              />
              <PasswordStrengthBar password={formValues.password} />
              <button
                className="bg-blue-300 mt-2 px-2 rounded-lg hover:bg-green-500"
                onClick={showHide}
              >
                {type === "input" ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <p className="text-red-500">{formErrors.password}</p>
            <div className="my-2 text-justify">
              <label className="text-lg ">Confirm Password:</label>
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

            <Link to="/">
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
