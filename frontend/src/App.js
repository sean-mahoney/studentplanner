import React, { useEffect, useState } from "react"; //Usestate
import Axios from "axios"; //import axios
import "./App.css";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import MainNavbar from "./components/MainNavbar";
import ToDoLists from "./pages/ToDoLists";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Greeting from "./components/Greeting";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState("");

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        setisLoggedIn(true);
      }
    });
  }, []);

  if (isLoggedIn) {
    return <Dashboard />;
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
