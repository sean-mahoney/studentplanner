import React from "react";
import { useState } from "react";
import LoginButtonLarge from "./Buttons/LoginButtonLarge";
import SignupButtonLarge from "./Buttons/SignupButtonLarge";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function ContentBarSection() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <>
      <div className="contentbar">
        <h2>Get Started</h2>
        <div className="content-btns">
          <button className="btn-outline" onClick={() => setShow2(true)}>
            Sign Up
          </button>
          <button className="btn-primary" onClick={() => setShow(true)}>
            Log In
          </button>
        </div>
      </div>
      <LoginForm onClose={() => setShow(false)} show={show} />
      <SignupForm onClose={() => setShow2(false)} show2={show2} />
    </>
  );
}

export default ContentBarSection;
