import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
//Main navigation menu component
function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Student Planner
          </Link>
          {/* Mobile responsive menu button*/}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          {/* Navigation Menu */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={() => setShow(true)}>Log In</button>
            </li>
            <li className="nav-item">
              <button onClick={() => setShow2(true)}>Sign Up</button>
            </li>
          </ul>
          <LoginForm onClose={() => setShow(false)} show={show} />
          <SignupForm onClose={() => setShow2(false)} show2={show2} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
