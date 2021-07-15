import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ToDoLists = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="ToDoList">
        <div className="ToDoList-wrapper"></div>
        <div className="ToDoList-wrapper"></div>
      </div>
    )
  );
};

export default ToDoLists;
