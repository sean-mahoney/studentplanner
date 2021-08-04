import React, { useState, useEffect } from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import StudyPlanPlan from "../components/study/StudyPlanPlan";

function StudyPlans() {
  const [Plans, setPlans] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [planName, setPlanName] = useState("");
  const [planDate, setPlanDate] = useState("No Due Date");
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDate, setNewPlanDate] = useState("");
  const [Plan, setPlan] = useState(0);
  const [show, setShow] = useState(false);
  const [currentPlanName, setCurrentPlanName] = useState("");

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
      due: planDate,
    }).then((response) => {
      Axios.post(`http://localhost:3001/getPlans`, {
        user: currentUser,
      }).then((response) => {
        setPlans(response.data);
      });
    });
  };

  const updatePlan = (id, plan, date) => {
    if (!newPlanName.length > 0) {
      setNewPlanName(plan);
    } else if (!newPlanDate.length > 0) {
      setPlanDate(date);
    } else {
      Axios.put("http://localhost:3001/updatePlan", {
        plan: newPlanName,
        due: newPlanDate,
        id: id,
      }).then((response) => {
        Axios.post(`http://localhost:3001/getPlans`, {
          user: currentUser,
        }).then((response) => {
          setPlans(response.data);
          setNewPlanName("");
          setPlanDate("");
        });
      });
    }
  };

  const deletePlan = (id) => {
    Axios.delete(`http://localhost:3001/deletePlan/${id}`).then((response) => {
      Axios.post(`http://localhost:3001/getPlans`, {
        user: currentUser,
      }).then((response) => {
        setPlans(response.data);
      });
    });
  };

  const selectCurrentPlan = (id) => {
    setPlan(id);
    console.log(Plan);
  };
  const selectCurrentPlanName = (id) => {
    setCurrentPlanName(id);
    console.log(currentPlanName);
  };

  const showPlan = () => {
    setShow(true);
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
                  <button
                    onClick={() => {
                      showPlan();
                      selectCurrentPlan(val.planid);
                      selectCurrentPlanName(val.plan);
                    }}
                  >
                    {val.plan}
                  </button>
                  <div className="duedate">
                    <p>Due:</p>
                    <p>{val.due}</p>
                  </div>
                  <div className="delete">
                    <AiTwotoneDelete onClick={() => deletePlan(val.planid)} />
                  </div>
                </div>
                <div className="updateStudy">
                  <input
                    type="text"
                    className="updateName"
                    onChange={(e) => {
                      setNewPlanName(e.target.value);
                    }}
                    placeholder="Update Name"
                  />
                  <input
                    type="date"
                    className="updateDate"
                    onChange={(e) => {
                      setNewPlanDate(e.target.value);
                    }}
                  />
                  <div className="update">
                    <AiFillEdit
                      onClick={() => updatePlan(val.planid, val.plan, val.date)}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <h3>Create a new plan/event</h3>
        <input
          type="text"
          onChange={(e) => {
            setPlanName(e.target.value);
          }}
          placeholder="Plan Name"
        />
        <label>Due Date</label>
        <input
          type="date"
          onChange={(e) => {
            setPlanDate(e.target.value);
          }}
        />
        <button className="btn-primary" onClick={createPlan}>
          Create
        </button>
      </div>
      <StudyPlanPlan
        show={show}
        currentPlan={Plan}
        currentPlanName={currentPlanName}
        onClose={() => setShow(false)}
      />
    </div>
  );
}

export default StudyPlans;
