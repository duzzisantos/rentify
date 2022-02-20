import "./App.css";
import React from "react";
import { Navbar } from "react-bootstrap";

const Logo = () => {
  return (
    <>
      <Navbar.Brand href="#home" className="my-logo">
        <img
          alt=""
          src="/rentify_logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Rentify
      </Navbar.Brand>
      ;
    </>
  );
};

export default Logo;