import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import qs from "qs";

const SignUp = () => {
  const [user, createUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/signup", qs.stringify(user))
      .then((res) => {
        console.log(res.status, "Successfully Signed Up!");
        res.send(res.data);
        if (res.data.redirect === "/") {
          window.location = "/home";
        } else if (
          res.data.redirect === "/account/login" &&
          user.username.value !== "" &&
          user.password.value !== ""
        ) {
          window.location = "/account/login";
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          window.location = "/account/login";
        }
      });
  };
  return (
    <div className="account-container">
      <div className="account-form-wrapper">
        <h3>Sign up</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="signup">Username:</label>

          <input
            type="text"
            name="signup"
            className="signup"
            spellCheck="false"
            autoComplete="on"
            required
            value={user.username}
            onChange={(e) => createUser({ ...user, username: e.target.value })}
          ></input>

          <label htmlFor="password">Password:</label>

          <input
            type="password"
            name="password"
            className="password"
            spellCheck="false"
            autoComplete="current-password"
            datatype=""
            minLength={6}
            maxLength={15}
            required
            value={user.password}
            onChange={(e) => createUser({ ...user, password: e.target.value })}
          ></input>
          <button type="submit" id="signup-btn">
            Sign up
          </button>
          <span></span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
