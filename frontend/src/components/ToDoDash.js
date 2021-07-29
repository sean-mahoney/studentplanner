import React from "react";
import Axios from "axios"; //import axios
import { Link } from "react-router-dom";
import Test from "./Test.js";

class ToDoDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      currentID: 0,
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        this.setState({ currentID: response.data.user[0].username });
      }
    });
  }
  render() {
    const pin = this.props.pin;
    console.log(pin);
    return (
      <div className="ToDoDash">
        <Test pin={pin} />
      </div>
    );
  }
}

export default ToDoDash;
