import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div>
      <ul>
        <li>
          Rentifye <FontAwesomeIcon icon={faHouse} /> &copy;{" "}
          {new Date().getFullYear}
        </li>
      </ul>
    </div>
  );
};

export default Footer;
