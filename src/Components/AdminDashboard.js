import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <>
      <nav className="flex bg-slate-200 justify-between">
        <Link to="/">
          <div className="p-2 m-2 text-lg">
            <b>Yokyo Olympic 2023</b>
          </div>
        </Link>

        <div className="p-2 m-2">
          <Link className="px-2 text-lg" to="/Home">
            <b>Admin Dashboard</b>
          </Link>
        </div>
        {localStorage.getItem("token") ? (
          <>
            <div className="p-2 m-2">
              <Link to="/ChangePassword" className="mx-2">
                Change Password
              </Link>
              <button
                className="bg-blue-300 px-2 py-1 mx-2 rounded-lg"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="bg-blue-300 px-2 m-3 rounded-lg h-8">
              <Link to="/Login">Login</Link>
            </button>
          </>
        )}
      </nav>
      <Sidebar></Sidebar>
    </>
  );
}
