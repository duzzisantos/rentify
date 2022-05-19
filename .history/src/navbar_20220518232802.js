import "./App.css";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from "./logo";
import {Link} from "react-router-dom";

const NavBarComponent = () => {
  return (
    <div className="navbar-holder">
      <Navbar bg="dark" variant="dark" fixed="top" className="navbar">
        <Container>
          <Logo />
          <Nav className="me-auto">
            <Nav><Link to="home" className="link">Home</Link></Nav>
            <Nav><Link to="admin" className="link">Create</Link></Nav>
            <Nav><Link to="tables" className="link">Read & Delete</Link></Nav>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
