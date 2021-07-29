import React from "react";
import Axios from "axios"; //import axios
import TodoListTasks from "../components/todo/TodoListTasks";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";

class ToDoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      newListName: "",
      currentID: "",
      show: false,
      updatedListName: "",
      Tasks: [],
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
    Axios.post("http://localhost:3001/getLists", {
      pin: this.props.pin,
    }).then((response) => {
      this.setState({ lists: response.data });
      console.log(response);
    });
  }
  createList = () => {
    Axios.post("http://localhost:3001/createList", {
      //post variables to backend
      list: this.state.newListName, //set this variable equal to the value
      id: this.state.currentID,
    });
    window.location.reload(false);
  };
  updateList = (id) => {
    Axios.put("http://localhost:3001/updateList", {
      list: this.state.updatedListName,
      id: id,
    });
  };
  deleteList = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3001/deleteList/${id}`);
    window.location.reload(false);
  };
  getTasks = (id) => {
    Axios.post("http://localhost:3001/getTasks", {
      id: id,
    }).then((response) => {
      this.setState({ Tasks: response.data });
    });
  };
  render() {
    return (
      <div className="ToDoList">
        <div className="ToDoList-wrapper">
          <h2>To do lists</h2>
          <div className="ToDoList-lists">
            {this.state.lists.map((val) => {
              return (
                <div>
                  <div className="list-button">
                    <button onClick={() => this.getTasks(val.list_id)}>
                      {val.list}
                    </button>
                    <div className="delete">
                      <AiFillEdit />
                    </div>
                    <div className="delete">
                      <AiTwotoneDelete
                        onClick={() => this.deleteList(val.list_id)}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.setState({ updatedListName: e.target.value });
                    }}
                    placeholder="List Name"
                  />
                  <button
                    className="update"
                    onClick={() => this.updateList(val.list_id)}
                  >
                    Update
                  </button>
                </div>
              );
            })}
          </div>
          <h3>Create a new list</h3>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ newListName: e.target.value });
            }}
            placeholder="List Name"
          />
          <button className="btn-primary" onClick={this.createList}>
            Create
          </button>
        </div>
        {this.state.Tasks.map((val, key) => {
          return <>{val.task}</>;
        })}
      </div>
    );
  }
}

export default ToDoLists;
