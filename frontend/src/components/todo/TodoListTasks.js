import React, { useState, useEffect } from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete, AiOutlineClose } from "react-icons/ai";

function TodoListTasks(props) {
  const [currentID, setCurrentID] = useState("");
  const [Task, setTask] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3001/getTasks", {
      id: props.currentList,
    }).then((response) => {
      setTasks(response.data);
    });
  }, [props.currentList]);

  useEffect(() => {
    Axios.post("http://localhost:3001/getCompletedTasks").then((response) => {
      setSelectedTasks(response.data);
    });
  }, []);

  const CreateTasks = () => {
    Axios.post("http://localhost:3001/createTask", {
      id: props.currentList,
      Task: Task,
      status: "false",
    }).then((response) => {
      Axios.post("http://localhost:3001/getTasks", {
        id: props.currentList,
      }).then((response) => {
        setTasks(response.data);
      });
    });
  };

  const CompleteTasks = (id) => {
    Axios.put("http://localhost:3001/completeTask", {
      id: id,
      complete: true,
    }).then((response) => {
      Axios.post("http://localhost:3001/getCompletedTasks")
        .then((response) => {
          setSelectedTasks(response.data);
        })
        .then((response) => {
          Axios.post("http://localhost:3001/getTasks", {
            id: props.currentList,
          }).then((response) => {
            setTasks(response.data);
          });
        });
    });
  };

  const undoComplete = (id) => {
    Axios.put("http://localhost:3001/undoComplete", {
      id: id,
      complete: false,
    })
      .then((response) => {
        Axios.post("http://localhost:3001/getTasks", {
          id: props.currentList,
        }).then((response) => {
          setTasks(response.data);
        });
      })
      .then((response) => {
        Axios.post("http://localhost:3001/getCompletedTasks").then(
          (response) => {
            setSelectedTasks(response.data);
          }
        );
      });
  };

  const deleteTask = (id) => {
    Axios.delete(`http://localhost:3001/deleteTask/${id}`)
      .then((response) => {
        Axios.post("http://localhost:3001/getTasks", {
          id: props.currentList,
        }).then((response) => {
          setTasks(response.data);
        });
      })
      .then((response) => {
        Axios.post("http://localhost:3001/getCompletedTasks").then(
          (response) => {
            setSelectedTasks(response.data);
          }
        );
      });
  };

  if (!props.show) {
    return null;
  }
  return (
    <div className="task-container">
      <div className="close">
        <AiOutlineClose onClick={props.onClose} />
      </div>
      <h2>Tasks</h2>
      <div className="task-box">
        {Tasks.map((val) => {
          return (
            <>
              <div className="task">
                <button
                  onClick={() => CompleteTasks(val.task_id)}
                  className="inner-task"
                >
                  {val.task}
                </button>
                <div className="delete">
                  <AiTwotoneDelete onClick={() => deleteTask(val.task_id)} />
                </div>
              </div>
            </>
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
      <button
        className="btn-primary"
        onClick={() => CreateTasks(props.currentList)}
      >
        Add
      </button>
      <h4>Completed Tasks</h4>
      <div className="task-box">
        {selectedTasks.map((val) => {
          return (
            <>
              <div className="task">
                <button
                  onClick={() => undoComplete(val.task_id)}
                  className="inner-task-complete"
                >
                  {val.task}
                </button>
                <div className="delete">
                  <AiTwotoneDelete onClick={() => deleteTask(val.task_id)} />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default TodoListTasks;
