import React, { useState, useEffect } from "react";
import Axios from "axios"; //import axios
import {
  AiTwotoneDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

function StudyPlanPlan(props) {
  const [Title, setTitle] = useState("");
  const [StartDate, setStartDate] = useState(0);
  const [DueDate, setDueDate] = useState(0);
  const [Priority, setPriority] = useState("");
  const [Pla, setPla] = useState([]);
  const [UpdatedTitle, setUpdatedTitle] = useState("");
  const [UpdatedStartDate, setUpdatedStartDate] = useState("");
  const [UpdatedDueDate, setUpdatedDueDate] = useState("");
  const [UpdatedPriority, setUpdatedPriority] = useState("");

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
      startdate: StartDate,
      duedate: DueDate,
      priority: Priority,
    }).then((response) => {
      Axios.post(`http://localhost:3001/getPla`, {
        id: props.currentPlan,
      }).then((response) => {
        setPla(response.data);
      });
    });
  };

  const updatePla = (id, title, start, due, priority) => {
    if (!UpdatedTitle) {
      setUpdatedTitle(title);
    } else if (!UpdatedStartDate) {
      setUpdatedStartDate(start);
    } else if (!UpdatedDueDate) {
      setUpdatedDueDate(due);
    } else if (!UpdatedPriority) {
      setUpdatedPriority(priority);
    } else {
      Axios.put("http://localhost:3001/updatePla", {
        id: id,
        title: UpdatedTitle,
        startdate: UpdatedStartDate,
        duedate: UpdatedDueDate,
        priority: UpdatedPriority,
      }).then((response) => {
        Axios.post(`http://localhost:3001/getPla`, {
          id: props.currentPlan,
        }).then((response) => {
          setPla(response.data);
          alert("Event Updated");
        });
      });
    }
  };

  const deletePla = (id) => {
    Axios.delete(`http://localhost:3001/deletePla/${id}`).then((response) => {
      Axios.post(`http://localhost:3001/getPla`, {
        id: props.currentPlan,
      }).then((response) => {
        setPla(response.data);
      });
    });
  };

  if (!Title.length > 0) {
    setTitle("New Event");
  }
  if (!StartDate.length > 0) {
    setStartDate("No Start Date");
  }
  if (!DueDate.length > 0) {
    setDueDate("No Due Date");
  }
  if (!Priority.length > 0) {
    setPriority("No Priority");
  }

  //

  if (!props.show) {
    return null;
  }

  return (
    <div className="pla-wrapper">
      <div className="close">
        <AiOutlineClose onClick={props.onClose} />
      </div>
      <div className="inner-pla">
        <div className="plan-row">
          <h3>{props.currentPlanName}</h3>
        </div>
        <div className="title-row">
          <h5>{props.currentPlanName}</h5>
        </div>
        <div className="label-row">
          <p>Task/Event</p>
          <p>Start Date</p>
          <p>Due Date</p>
          <p>Priority</p>
        </div>
        {Pla.map((val) => {
          return (
            <div className="subtitle-row">
              <input
                className="eventfull"
                type="text"
                placeholder={val.title}
                onChange={(e) => {
                  setUpdatedTitle(e.target.value);
                }}
              ></input>
              <input
                className="date1full placeholderclass"
                type="date"
                placeholder={val.startdate}
                onChange={(e) => {
                  setUpdatedStartDate(e.target.value);
                }}
              ></input>
              <input
                className="date2full placeholderclass"
                type="date"
                placeholder={val.duedate}
                onChange={(e) => {
                  if (!UpdatedDueDate.length > 0) {
                    setUpdatedDueDate(val.duedate);
                  } else {
                    setUpdatedDueDate(e.target.value);
                  }
                }}
              ></input>
              <select
                name="priority"
                className="priority"
                onChange={(e) => {
                  if (!UpdatedPriority.length > 0) {
                    setUpdatedPriority(val.priority);
                  } else {
                    setUpdatedPriority(e.target.value);
                  }
                }}
              >
                <option value="" disabled selected hidden>
                  {val.priority}
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="update-icon">
                <AiFillEdit
                  onClick={() => {
                    updatePla(
                      val.titleid,
                      val.title,
                      val.startdate,
                      val.duedate,
                      val.priority
                    );
                  }}
                />
              </div>
              <div className="delete-icon">
                <AiTwotoneDelete onClick={() => deletePla(val.titleid)} />
              </div>
            </div>
          );
        })}
        <div className="title-row">
          <h5>Create a new event, task or milestone.</h5>
        </div>
        <div className="subtitle-row">
          <input
            className="event"
            type="text"
            placeholder="New Task/event name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <input
            className="date1"
            type="date"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          ></input>
          <input
            className="date2"
            type="date"
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          ></input>
          <select
            name="priority"
            className="priority"
            onChange={(e) => {
              setPriority(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="create">
            <AiOutlineCheck onClick={CreatePla} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyPlanPlan;
