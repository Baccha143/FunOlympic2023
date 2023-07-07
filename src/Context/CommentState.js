import React, { useState } from "react";
import commentContext from "./commentContext";

const CommentState = (props) => {
  const host = "http://localhost:4000";
  const commentInitial = [];
  const [comments, setComments] = useState(commentInitial);

  //Get all comments
  const getComments = async () => {
    //API Call
    const response = await fetch(`${host}/api/auth/fetchallcomments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjliMDdlMWFkYTM4ZTA3NzEzNjNjIn0sImlhdCI6MTY4MjY3NjQ5Nn0.Y_kSI_opLF1dsjBTqZaHvnlQOJ1_kQFW6L5cwdDjqu8",
      },
    });
    const json = await response.json();
    console.log(json);
    setComments(json);
  };

  //Add a comment
  const addComments = async (username, description) => {
    //API Call
    const response = await fetch(`${host}/api/auth/addcomments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjliMDdlMWFkYTM4ZTA3NzEzNjNjIn0sImlhdCI6MTY4MjY3NjQ5Nn0.Y_kSI_opLF1dsjBTqZaHvnlQOJ1_kQFW6L5cwdDjqu8",
      },
      body: JSON.stringify({ username, description }),
    });

    const comment = await response.json();
    setComments(comments.concat(comment));
  };

  return (
    <commentContext.Provider value={{ comments, addComments, getComments }}>
      {props.children}
    </commentContext.Provider>
  );
};

export default CommentState;
