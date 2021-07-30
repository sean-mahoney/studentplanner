import React from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete } from "react-icons/ai";

class TodoListTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: "",
      Task: "",
      selectedTasks: [],
    };
  }

  componentDidMount() {
    Axios.post("http://localhost:3001/getCompletedTasks", {}).then(
      (response) => {
        this.setState({ selectedTasks: response.data }, () => {
          console.log(this.state.selectedTasks);
        });
      }
    );
  }

  CreateTasks = () => {
    Axios.post("http://localhost:3001/createTask", {
      //post variables to backend
      id: this.props.currentList,
      Task: this.state.Task, //set this variable equal to the value
      status: "false",
    });
    console.log(this.props.currentList);
    alert("Task Added");
    console.log(Response);
  };

  CompleteTasks = (id) => {
    Axios.put("http://localhost:3001/completeTask", {
      id: id,
      complete: true,
    });
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="task-container">
        <h2>Tasks</h2>
        <div className="task-box">
          {this.props.Tasks.map((val) => {
            return (
              <>
                <div className="task">
                  <button
                    onClick={() => this.CompleteTasks(val.task_id)}
                    className="inner-task"
                  >
                    {val.task}
                  </button>
                  <div className="delete">
                    <AiTwotoneDelete />
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
            this.setState({ Task: e.target.value });
          }}
          placeholder="Task Name"
        />
        <button className="btn-primary" onClick={this.CreateTasks}>
          Add
        </button>
        {this.state.selectedTasks.map((val) => {
          return (
            <>
              <div className="task">
                <button
                  onClick={() => this.CompleteTasks(val.task_id)}
                  className="inner-task"
                >
                  {val.task}
                </button>
                <div className="delete">
                  <AiTwotoneDelete />
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  }
}
export default TodoListTasks;
