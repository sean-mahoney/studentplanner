import React from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth0 } from "@auth0/auth0-react";

function HeroSection() {
  const { isAuthenticated } = useAuth0();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    !isAuthenticated && (
      <div className="hero-container">
        <div className="hero-box-container">
          <div className="hero-box">
            <h1>Plan Your Studies</h1>
            <p>
              With the student planner application you can manage your studies
              in a productive, efficient and fun way. We'll help you advance
              your academic career with ease.
            </p>
            <div className="hero-btns">
              <button className="btn-outline" onClick={() => setShow2(true)}>
                Sign Up
              </button>
              <button className="btn-primary" onClick={() => setShow(true)}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default HeroSection;
