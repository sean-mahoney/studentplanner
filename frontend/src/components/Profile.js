import React, { useEffect, useState, Component } from "react"; //Usestate
import Axios from "axios"; //import axios

const Profile = () => {
  const [LoggedInUser, setLoggedInUser] = useState("");
  const [LoggedInEmail, setLoggedInEmail] = useState("");
  const [LoggedInUsername, setLoggedInUsername] = useState("");

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        setLoggedInUser(response.data.user[0].name);
      }
    });
  }, []);

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        setLoggedInEmail(response.data.user[0].email);
      }
    });
  }, []);

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        setLoggedInUsername(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="Userprofile">
      <h2>{LoggedInUser}</h2>
      <h4>Username: {LoggedInUsername}</h4>
      <p>{LoggedInEmail}</p>
    </div>
  );
};

export default Profile;
