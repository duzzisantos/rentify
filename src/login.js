import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import qs from "qs";

const Login = () => {
  const [user, loginUser] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4000/api/login", qs.stringify(user))
      .then((res) => {
        res.send(res.data);
        console.log("Successfully Logged in.", res.status);
        if (res.data.redirect === "/") {
          window.location = "/signup";
        } else if (
          res.data.redirect === "/login" &&
          user.username !== "" &&
          user.password !== ""
        ) {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
        window.location = "/home";
      });
  };

  return (
    <div className="account-container">
      <div className="account-form-wrapper">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <label htmlFor="login">Username:</label>
          <input
            type="text"
            name="login"
            id="login"
            spellCheck="false"
            value={user.username}
            onChange={(e) => loginUser({ ...user, username: e.target.value })}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            min="6"
            max="15"
            value={user.password}
            onChange={(e) => loginUser({ ...user, password: e.target.value })}
          ></input>
          <button type="submit" id="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
