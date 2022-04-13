import React from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
const Account = () => {
  return (
    <div className="account-display">
      <div id="account-wrapper">
        <ul className="account-nav">
          <li><Link to="signup" className="links">Sign Up</Link></li>
          <li><Link to="login" className="links">Login</Link></li>
        </ul>
        <Routes>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Account;
