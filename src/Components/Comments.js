import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Comments = () => {
  const [comment, setComment] = useState({ username: "", description: "" });

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

  const handleClick = async (e) => {
    const authToken = localStorage.getItem("token");
    const usernames = localStorage.getItem("username");
    try {
      // Make a request to the server to add the comment
      const response = await axios.post(
        "http://localhost:4000/api/auth/addcomments",
        {
          username: usernames,
          description: comment.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );
      // Update the comment state with the new comment
      setComment(...comment, response.data);
      // Clear the input fields
      setComment({
        username: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const onChange = (e) => {
    setComment({ ...comment, description: e.target.value });
  };

  return (
    <>
      <form className="ml-3">
        <label>
          <b className="text-2xl">Comments:</b>
        </label>
        <div className="mb-4">
          {Array.from(comment).map((comment) => (
            <div key={comment._id} className="">
              <div className="">
                <b>{comment.username}:</b>
              </div>
              <div> {comment.description}</div>
            </div>
          ))}
        </div>

        {localStorage.getItem("token") ? (
          <>
            <div className="text-center">
              <textarea
                className=" w-96 bg-slate-200 p-2"
                placeholder="Enter you comment"
                value={comment.description}
                onChange={onChange}
                
              ></textarea>
            </div>
            <button
              className=" bg-green-500 p-2 rounded-lg"
              onClick={handleClick}
            >
              Comment
            </button>
          </>
        ) : (
          <>
            <div className="text-center">
              <textarea
                className=" bg-slate-200 w-96 p-2"
                placeholder="To Comment Please Login First"
                disabled
              ></textarea>
            </div>
            <button className=" bg-green-500 p-2 rounded-lg" disabled={true}>
              Comment
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Comments;
