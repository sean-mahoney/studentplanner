import React from "react";
import Axios from "axios"; //import axios
import { Link } from "react-router-dom";

class ToDoDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      currentUser: window.localStorage.currentuser,
    };
  }
  componentDidMount() {
    Axios.post("http://localhost:3001/getLists", {
      currentUser: this.state.currentUser,
    }).then((response) => {
      this.setState({ lists: response.data });
    });
  }
  render() {
    if (!this.state.lists.length > 0) {
      return (
        <div className="ToDoDash">
          <Link to="/ToDoLists">
            <h2>To-Do Lists</h2>
            <p>
              <em>No Lists to Show.</em> Click here to create some
            </p>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="ToDoDash">
          <Link to="/ToDoLists">
            <h2>To-Do Lists</h2>
            <div className="ToDoDash-lists">
              {this.state.lists.map((val, key) => {
                return (
                  <div>
                    <p>{val.list}</p>
                  </div>
                );
              })}
            </div>
          </Link>
        </div>
      );
    }
  }
}

export default ToDoDash;
