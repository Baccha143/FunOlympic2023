import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [creds, setCreds] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: creds.username,
        password: creds.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("username", creds.username);
      navigate("/Dashboard", { replace: true });
      alert("Login Successful");
    } else if ((creds.username === "", creds.password === "")) {
      alert("Please enter both fields");
    } else {
      alert("Invalid username or password");
    }
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center font-serif">
        <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-10 text-center rounded-lg w-96 border-2 h-auto">
          <h1 className="text-3xl">User Login</h1> <hr />
          <form onSubmit={handleSubmit}>
            <div className=" my-2 text-justify">
              <label className="text-lg">Username:</label>
              <br />
              <input
                className="bg-blue-300 rounded-md w-72 text-sm h-7 pl-2"
                type="username"
                id="username"
                name="username"
                value={creds.username}
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
              className="bg-blue-300 mt-4 px-3 mx-4 py-1 rounded-lg hover:bg-emerald-400"
              type="submit"
            >
              Login
            </button>
            <Link to="/AdminLogin">
              <button className="bg-blue-300 mt-4 px-3 py-1 rounded-lg hover:bg-emerald-400">
                Admin Login
              </button>
            </Link>
          </form>
          <div className="mt-4">
            <h1 className="text-2xl">New Here ? </h1>
            <hr />
            <p className="mt-2">Sign up and connect with us!!</p>
            <Link to="/signup">
              <button className="bg-blue-300 mt-4 px-3 py-1 rounded-lg hover:bg-emerald-400">
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
