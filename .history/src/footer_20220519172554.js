import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-list">
        <li>
          Rentifye <FontAwesomeIcon icon={faHouse} /> &copy;{" "}
          {new Date().getFullYear}
        </li>
        <li>Jobs</li>
        <li>Partners</li>
        <li>About</li>
      </ul>
    </div>
  );
};

export default Footer;
