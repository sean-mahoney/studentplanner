import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Profile";
import ToDoDash from "../components/ToDoDash";
import StudyDash from "../components/StudyDash";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="Dashboard">
        <Profile />
        <ToDoDash />
        <StudyDash />
      </div>
    )
  );
};

export default Dashboard;
