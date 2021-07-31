import React, { useState, useEffect } from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";

function StudyPlans() {
  const [Plans, setPlans] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [planName, setPlanName] = useState("");

  const currentUser = window.localStorage.currentuser;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        setCurrentID(response.data.user[0].id);
      }
    });
  }, []);

  useEffect(() => {
    Axios.post(`http://localhost:3001/getPlans`, {
      user: currentUser,
    }).then((response) => {
      setPlans(response.data);
    });
  }, [currentUser]);

  const createPlan = () => {
    Axios.post("http://localhost:3001/createPlan", {
      id: currentID,
      plan: planName,
      user: currentUser,
    }).then((response) => {
      Axios.post(`http://localhost:3001/getPlans`, {
        user: currentUser,
      }).then((response) => {
        setPlans(response.data);
      });
    });
  };

  return (
    <div className="StudyPlans">
      <div className="StudyPlans-wrapper">
        <h2>Study Plans</h2>
        <div className="StudyPlans-plans">
          {Plans.map((val) => {
            return (
              <>
                <div className="StudyPlans-button">
                  <button>{val.plan}</button>
                </div>
              </>
            );
          })}
        </div>
        <h3>Create a new Plan</h3>
        <input
          type="text"
          onChange={(e) => {
            setPlanName(e.target.value);
          }}
          placeholder="Plan Name"
        />
        <button className="btn-primary" onClick={createPlan}>
          Create
        </button>
      </div>
    </div>
  );
}

export default StudyPlans;
