import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Footer() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <div className="footer">
      <Link to="/" className="footer-logo">
        Student Planner
      </Link>
      <ul className="footernav">
        <li>
          <Link to="/" className="footer-links">
            Home
          </Link>
        </li>
        <li>
          <button onClick={() => setShow2(true)}>Sign Up</button>
        </li>
        <li>
          <button onClick={() => setShow(true)}>Log In</button>
        </li>
      </ul>
      <LoginForm onClose={() => setShow(false)} show={show} />
      <SignupForm onClose={() => setShow2(false)} show2={show2} />
    </div>
  );
}

export default Footer;
