import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import views from "./Img/view.png";
import viewers from "./Img/viewers.png";
import Broadcast from "./broadcast";

export default function Sidebar() {
  const [comment, setComment] = useState({ username: "", description: "" });
  const [user, setUsers] = useState({ username: "", email: "", phone: "" });

  useEffect(() => {
    //fetch users from server
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/fetchallusers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZTZhZTc4ZDY4Njg2NDgxNzZkNmU5In0sImlhdCI6MTY4NzA1NTA3OX0.jGIEFCwJCg-yMV4cjJVVjn5KWZXqhLouROZVCO87qV0",
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  //Delete a user
  const deleteUser = async (id) => {
    //API Call
    const response = await fetch(
      `http://localhost:4000/api/auth/deleteuser${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjliMDdlMWFkYTM4ZTA3NzEzNjNjIn0sImlhdCI6MTY4MjY3NjQ5Nn0.Y_kSI_opLF1dsjBTqZaHvnlQOJ1_kQFW6L5cwdDjqu8",
        },
      }
    );
    const json = response.json();
    console.log(json);
    const newUsers = user.filter((user) => {
      return user._id !== id;
    });
    setUsers(newUsers);
  };

  useEffect(() => {
    // Fetch user comments from the server
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/fetchallcomments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjliMDdlMWFkYTM4ZTA3NzEzNjNjIn0sImlhdCI6MTY4MjY3NjQ5Nn0.Y_kSI_opLF1dsjBTqZaHvnlQOJ1_kQFW6L5cwdDjqu8",
            },
          }
        );
        setComment(response.data);
      } catch (error) {
        console.error("Error fetching user comments:", error);
      }
    };

    fetchComments();
  }, []);

  //Delete a comment
  const deleteComment = async (id) => {
    //API Call
    const response = await fetch(
      `http://localhost:4000/api/auth/deletecomment${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjliMDdlMWFkYTM4ZTA3NzEzNjNjIn0sImlhdCI6MTY4MjY3NjQ5Nn0.Y_kSI_opLF1dsjBTqZaHvnlQOJ1_kQFW6L5cwdDjqu8",
        },
      }
    );
    const json = response.json();
    console.log(json);
    const newComments = comment.filter((comment) => {
      return comment._id !== id;
    });
    setComment(newComments);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div
        className={`sidebar border-t-2 border-black bg-slate-200 text-white w-64 min-h-screen ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold text-black">Admin Dashboard</h2>
        </div>
        <ul className="p-2">
          <li className="p-2 hover:bg-gray-900 hover:text-white cursor-pointer text-black">
            Dashboard
          </li>
          <li className="p-2 hover:bg-gray-900 hover:text-white cursor-pointer text-black">
            Users
          </li>
          <li className="p-2 hover:bg-gray-900 hover:text-white cursor-pointer text-black">
            Broadcasts
          </li>
          <li className="p-2 hover:bg-gray-900 hover:text-white cursor-pointer text-black">
            Settings
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <button
          onClick={toggleSidebar}
          className="p-4 text-gray-600 focus:outline-none focus:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
        <div className="p-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to the Admin Dashboard</h1>
          <div className="flex pl-20 py-6 justify-between">
            <img src={views} alt="views" className=" w-96" />
            <img src={viewers} alt="viewers" className="mr-10 w-1.5/3" />
          </div>

          <div className="mt-8 ml-5">
            <label>
              <b className="text-2xl flex justify-center">Users:</b>
            </label>
            <div className="p-5 flex justify-center">
              <table className="w-4/5 bg-gray-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 bg-gray-500 text-white">Username</th>
                    <th className="py-2 bg-gray-500 text-white">Email</th>
                    <th className="py-2 bg-gray-500 text-white">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(user).map((user) => (
                    <tr key={user._id} className="text-center">
                      <td className="py-2">{user.username}</td>
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">{user.phone}</td>
                      <td className="py-2">
                        <button
                          className="bg-red-600 px-2 py-1 mx-2 rounded-lg hover:bg-blue-600"
                          onClick={() => {
                            deleteUser(user._id);
                            alert("User Deleted Successfully");
                          }}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 ml-5">
            <label>
              <b className="text-2xl flex justify-center">Comments:</b>
            </label>
            <div className="p-5 flex justify-center">
              <table className="w-4/5 bg-gray-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 bg-gray-500 text-white">Username</th>
                    <th className="py-2 bg-gray-500 text-white">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(comment).map((comment) => (
                    <tr key={comment._id} className="text-center">
                      <td className="py-2">{comment.username}</td>
                      <td className="py-2">{comment.description}</td>
                      <td className="py-2">
                        <button
                          className="bg-red-600 px-2 py-1 mx-2 rounded-lg hover:bg-blue-600"
                          onClick={() => {
                            deleteComment(comment._id);
                            alert("Comment Deleted Successfully");
                          }}
                        >
                          Delete Comment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Broadcast></Broadcast>
        </div>
      </div>
    </div>
  );
}
