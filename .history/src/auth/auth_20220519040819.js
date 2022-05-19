import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { db, auth, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCake,
  faClock,
  faHouse,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCake, faPowerOff, faHouse, faClock, faUser, faBars);
const isAuthorized = process.env.REACT_APP_IS_AUTHORIZED; //This gives access to admin pages

const Auth = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => { //http request to fetch user from firebase store
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    } else if (!user) {
      fetchUserName();
      return navigate("/");
    }
  });

  // handles menu collapse for navbar

  const handleMenuCollapse = () => {
    var navitems = document.getElementById("myTopnav");
    if (navitems.className === "nav-items") {
      navitems.className += " responsive";
    } else {
      navitems.className = "nav-items";
    }
  };

  return (
    <div className="auth-container">
      <nav className="navbar">
        {/* <div className="img-holder" id="active"></div> */}
        <ul className="nav-items" id="myTopnav">
          <li className="nav-links" id="active">
            <Link to="/auth/home" className="nav-links">
              Rentifye <FontAwesomeIcon icon={faHouse} />
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/auth/home" className="link">
              Home
            </Link>
          </li>
          {user?.uid === isAuthorized ? (
            <>
              <li className="nav-links">
                <Link to="/auth/admin" className="link">
                  Admin
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/auth/tables" className="link">
                  Database
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        
           {/* <li
            className="nav-links"
            id="hamburger-icon"
            onClick={handleMenuCollapse}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />
          </li> */}
          <li className="nav-links">
            <div className="auth-container">
              <span className="auth-span">
                <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
              </span>
              <span className="auth-span">{name}</span>
              <div className="auth-avi" title="Logged in">
                {user?.email[0].toUpperCase()}
              </div>
              <span className="auth-span">{user?.email}</span>
              <button
                className="auth-btn"
                onClick={logout}
                type="button"
                title="Logout"
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            </div>
          </li>
          <li
            className="nav-links"
            id="hamburger-icon"
            onClick={handleMenuCollapse}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "30px" }} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Auth;
