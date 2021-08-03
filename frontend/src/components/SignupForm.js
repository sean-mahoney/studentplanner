import React, { useState } from "react"; //Usestate
import Axios from "axios"; //import axios

const SignupForm = (props) => {
  //Sign up form component

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [nameReg, setNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      //post variables to backend
      username: usernameReg, //set this variable equal to the value of usernameReg
      email: emailReg,
      fullname: nameReg,
      password: passwordReg,
    }).then((response) => {
      if (!response.data.userExist) {
        alert("That username is already taken");
      } else {
        alert("Account created. Now please log in");
        window.location.reload(false);
      }
    });
  };

  if (!props.show2) {
    return null;
  }

  return (
    //Sign up Form
    <div className="signupform">
      <form>
        <h2>Sign Up</h2>
        <input
          type="email"
          onChange={(e) => {
            setEmailReg(e.target.value); //setEmailReg variable to the value of the input
          }}
          placeholder="E-Mail Address"
        />
        <input
          type="text"
          onChange={(e) => {
            setNameReg(e.target.value); //setNameReg variable to the value of the input
          }}
          placeholder="Your Name"
        />
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value); //setUsernameReg variable to the value of the input
          }}
          placeholder="Create a Username"
        />
        <h3>Password</h3>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value); //setPasswordReg variable to the value of the input
          }}
          placeholder="Choose a Password"
        />
      </form>
      <div className="formbuttons">
        {/* On click do register function */}
        <button className="btn-primary" onClick={register}>
          Sign Up
        </button>
        <button className="btn-outline" onClick={props.onClose}>
          Close
        </button>
      </div>
      <p>
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
  );
};

export default SignupForm;
