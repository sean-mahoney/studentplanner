import React, { useEffect, useState } from "react"; //Usestate
import Axios from "axios"; //import axios

const TodoListTasks = (props) => {
  const [currentID, setcurrentID] = useState("");
  const [Task, setTask] = useState("");
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        setcurrentID(response.data.user[0].id);
      }
    });
  }, []);

  const CreateTasks = () => {
    Axios.post("http://localhost:3001/createTask", {
      //post variables to backend
      Task: Task, //set this variable equal to the value
      currentID: currentID,
    });
  };

  useEffect(() => {
    //On button click send get request to backend
    Axios.get("http://localhost:3001/showTasks", { currentID: currentID }).then(
      (response) => {
        //get response
        setTasks(response.data);
      }
    );
  });

  if (!props.show) {
    return null;
  }

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <div className="tasks-tasks">
        {Tasks.map((val, key) => {
          return (
            <div>
              <p>{val.task}</p>
            </div>
          );
        })}
      </div>
      <h3>Create a new task</h3>
      <input
        type="text"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        placeholder="Task Name"
      />
      <button className="btn-primary" onClick={CreateTasks}>
        Add
      </button>
    </div>
  );
};
export default TodoListTasks;
