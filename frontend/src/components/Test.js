import React from "react"; //Usestate
import Axios from "axios"; //import axios
import { Link } from "react-router-dom";

export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }
  loadlists = () => {
    Axios.post("http://localhost:3001/getLists", {
      pin: this.props.pin,
    }).then((response) => {
      this.setState({ lists: response.data });
    });
  };
  render() {
    return (
      <div className="ToDoDash">
        <button onClick={this.loadlists}>Enter</button>
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

export default Test;
