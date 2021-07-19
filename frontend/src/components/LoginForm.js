import React, { useEffect, useState } from "react"; //Usestate
import Axios from "axios"; //import axios

const LoginForm = (props) => {
  function refreshPage() {
    window.location.reload(false);
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [counter, setcounter] = useState(0);

  //ensures axios sends cookie requests
  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      //post variables to backend *change url when deploying
      username: username, //set this variable equal to the value of usernameReg
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        //if message is returned from db
        setLoginStatus(false);
        setErrorMessage("Incorrect Username/Password");
        setcounter(counter + 1);
      } else {
        //if no messages are displayed
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        refreshPage();
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  if (!props.show) {
    return null;
  }

  return (
    //Login Form
    <div className="signupform">
      <h2>Login</h2>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value); //setUsername variable to the value of the input
        }}
        placeholder="Username"
      />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value); //setPassword variable to the value of the input
        }}
        placeholder="Password"
      />
      <div className="formbuttons">
        {/* On click do register function */}
        <button className="btn-primary" onClick={login}>
          Login
        </button>
        <button className="btn-outline" onClick={props.onClose}>
          Close
        </button>
      </div>
      <p>
        Don't have an account? <a href="/">Sign Up</a>
      </p>
      {/* message that displays login status
       */}
      <h3>
        {errorMessage} {counter}
      </h3>
    </div>
  );
};

export default LoginForm;
