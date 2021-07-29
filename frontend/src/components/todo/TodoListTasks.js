import React from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete } from "react-icons/ai";

class TodoListTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: "",
      Task: "",
      Tasks: this.props.Tasks,
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        this.setState({ currentID: response.data.user[0].id });
      }
    });
  }
  CreateTasks = () => {
    Axios.post("http://localhost:3001/createTask", {
      //post variables to backend
      Task: this.state.Task, //set this variable equal to the value
      id: this.state.currentID,
    });
    window.location.reload(false);
  };

  render() {
    return (
      <div className="task-container">
        <h2>Tasks</h2>
        <div className="task-box">
          {this.state.Tasks.map((val, key) => {
            return (
              <div className="task">
                <button className="inner-task">{val.task}</button>
                <div className="delete">
                  <AiTwotoneDelete />
                </div>
              </div>
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
      </div>
    );
  }
}
export default TodoListTasks;
