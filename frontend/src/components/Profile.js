import React from "react";
import Axios from "axios"; //import axios

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedInUser: "",
      LoggedInEmail: "",
      LoggedInUsername: "",
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        this.setState({ LoggedInUser: response.data.user[0].name });
      }
    });
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        this.setState({ LoggedInEmail: response.data.user[0].email });
      }
    });
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        this.setState({ LoggedInUsername: response.data.user[0].username });
      }
    });
  }
  render() {
    return (
      <div className="Userprofile">
        <h2>{this.state.LoggedInUser}</h2>
        <h4>Username: {this.state.LoggedInUsername}</h4>
        <p>{this.state.LoggedInEmail}</p>
      </div>
    );
  }
}

export default Profile;
