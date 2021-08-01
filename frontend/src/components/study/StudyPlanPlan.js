import React, { useState, useEffect } from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";

function StudyPlanPlan(props) {
  const [Title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [StartDate, setStartDate] = useState(0);
  const [DueDate, setDueDate] = useState(0);
  const [Pla, setPla] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3001/getPla", {
      id: props.currentPlan,
    }).then((response) => {
      setPla(response.data);
    });
  }, [props.currentPlan]);

  const CreatePla = () => {
    Axios.post("http://localhost:3001/createPla", {
      planid: props.currentPlan,
      title: Title,
      subtitle: SubTitle,
      startdate: StartDate,
      duedate: DueDate,
    }).then((response) => {
      Axios.post(`http://localhost:3001/getPla`, {
        id: props.currentPlan,
      }).then((response) => {
        setPla(response.data);
      });
    });
  };
  if (!StartDate.length > 0) {
    setStartDate("dd/mm/yy");
  }
  if (!DueDate.length > 0) {
    setDueDate("dd/mm/yy");
  }
  if (!props.show) {
    return null;
  }
  return (
    <div className="pla-wrapper">
      <div className="inner-pla">
        <div className="plan-row">
          <h3>{props.currentPlanName}</h3>
        </div>
        <div className="title-row">
          <h4>{props.currentPlanName}</h4>
        </div>
        <div className="label-row">
          <p>Task/Event</p>
          <p>Start Date</p>
          <p>Due Date</p>
        </div>
        <div className="subtitle-row">
          <input
            className="event"
            type="text"
            placeholder={props.currentPlanName}
          ></input>
          <input className="date1" type="text" placeholder={StartDate}></input>
          <input className="date2" type="text" placeholder={DueDate}></input>
        </div>
      </div>
    </div>
  );
}

export default StudyPlanPlan;
