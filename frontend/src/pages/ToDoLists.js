import React from "react";
import Axios from "axios"; //import axios
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import TodoListTasks from "../components/todo/TodoListTasks";

class ToDoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      newListName: "",
      currentID: "",
      updatedListName: "",
      Tasks: [],
      currentList: 0,
      currentUser: window.localStorage.currentuser,
      show: false,
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        this.setState({ currentID: response.data.user[0].id });
      }
    });

    Axios.post("http://localhost:3001/getLists", {
      currentUser: this.state.currentUser,
    }).then((response) => {
      this.setState({ lists: response.data });
    });
  }

  createList = () => {
    Axios.post("http://localhost:3001/createList", {
      //post variables to backend
      list: this.state.newListName, //set this variable equal to the value
      id: this.state.currentID,
      currentUser: this.state.currentUser,
    }).then((response) => {
      Axios.post("http://localhost:3001/getLists", {
        currentUser: this.state.currentUser,
      }).then((response) => {
        this.setState({ lists: response.data });
      });
    });
  };

  updateList = (id) => {
    Axios.put("http://localhost:3001/updateList", {
      list: this.state.updatedListName,
      id: id,
    }).then((response) => {
      Axios.post("http://localhost:3001/getLists", {
        currentUser: this.state.currentUser,
      }).then((response) => {
        this.setState({ lists: response.data });
      });
    });
  };

  deleteList = (id) => {
    Axios.delete(`http://localhost:3001/deleteList/${id}`).then((response) => {
      Axios.post("http://localhost:3001/getLists", {
        currentUser: this.state.currentUser,
      }).then((response) => {
        this.setState({ lists: response.data });
        this.setState({ show: false });
      });
    });
  };

  setList = (id) => {
    this.setState({ currentList: id });
    console.log(this.state.currentList);
  };

  showTasks = () => {
    this.setState({ show: true });
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
                    <button
                      onClick={() => {
                        this.showTasks();
                        this.setList(val.list_id);
                      }}
                    >
                      {val.list}
                    </button>
                    <div className="delete">
                      <AiTwotoneDelete
                        onClick={() => this.deleteList(val.list_id)}
                      />
                    </div>
                  </div>
                  <div className="updateList">
                    <input
                      type="text"
                      onChange={(e) => {
                        this.setState({ updatedListName: e.target.value });
                      }}
                      placeholder="Update"
                    />
                    <div className="update">
                      <AiFillEdit
                        onClick={() => this.updateList(val.list_id)}
                      />
                    </div>
                  </div>
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
        <TodoListTasks
          currentList={this.state.currentList}
          onClose={() => this.setState({ show: false })}
          show={this.state.show}
        />
      </div>
    );
  }
}

export default ToDoLists;
