import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import LogoutButton from "./Buttons/LogoutButton";
//Main navigation menu component
function MainNavbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div className="Main-navbar-top">
        <div className="Main-navbar-top-half">
          <Link to="/" className="navbar-logo">
            Student Planner
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <AiOutlineMenu />
          </div>
        </div>
      </div>
      <nav className="Main-navbar">
        <div className="Main-navbar-container">
          {/* Navigation Menu */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/ToDoLists"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                To Do Lists
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/StudyPlans"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Study Plans
              </Link>
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default MainNavbar;
