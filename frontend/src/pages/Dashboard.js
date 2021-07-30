import React, { useState } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Profile from "../components/Profile";
import ToDoDash from "../components/ToDoDash";
import StudyDash from "../components/StudyDash";
import ToDoLists from "./ToDoLists";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Profile />
      <ToDoDash />
      <StudyDash />
    </div>
  );
};

export default Dashboard;
