import React from "react";
import Profile from "../components/Profile";
import ToDoDash from "../components/ToDoDash";
import StudyDash from "../components/StudyDash";

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
