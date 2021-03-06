import "./App.css";
import "react-router-dom";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faParking,
  faWheelchair,
  faEye,
  faSquareCheck,
  faCreditCardAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Auth from "./auth/auth";
import Footer from "./footer";

library.add(
  faWifi,
  faParking,
  faWheelchair,
  faEye,
  faCreditCardAlt,
  faSquareCheck,
  faSearch
);

const Homepage = () => {
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  //client-side JavaScript
  const getResultsFromServer = async () => {
    try {
      const response = await axios.get(
        "https://desolate-shore-41320.herokuapp.com/properties",
        display
      );
      setDisplay(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResultsFromServer();
  });

  return (
    <>
      <Auth />
      <div className="hero">
        <h1>Your go-to platform for property rentals in Philadelphia.</h1>
        <h4 title="Search for listings"><FontAwesomeIcon icon={faSearch}/></h4>
        <input
          type="search"
          id="search"
          onChange={(event) => setSearch(event.target.value)}
          name="search"
          placeholder="Filter by district. Eg: East Philadelphia"
        />
      </div>
      <div className="filter-property">
        <div id="display-results">
          <h5>Listings</h5>
          {display
            .filter((item) =>
              search === ""
                ? item
                : search.match(new RegExp(`${item.district}`, "gi"))
                ? item
                : !item
            )
            .map((item) => {
              return (
                <div className="one-result" key={item._id}>
                  <ul className="primary-details">
                    <li>Property ID: {item.propertyID}</li>
                    <li>Property Name: {item.propertyName}</li>
                    <li>Address: {item.address}</li>
                    <li>District: {item.district}</li>
                    <li>Price: ${item.price}</li>
                  </ul>
                  <div className="image-holder">
                    <div className="photo1">
                      <img src={item.photos1} alt="event-center"></img>
                    </div>
                    <div className="photo2">
                      <img src={item.photos2} alt="event-center"></img>
                    </div>
                    <div className="photo3">
                      <img src={item.photos3} alt="event-center"></img>
                    </div>
                    <div className="photo4">
                      <img src={item.photos4} alt="event-center"></img>
                    </div>
                    <div className="photo5">
                      <img src={item.photos5} alt="event-center"></img>
                    </div>
                    <div className="photo6">
                      <img src={item.photos6} alt="event-center"></img>
                    </div>
                  </div>
                  <ul className="amenities">
                    <li>
                      <FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>{" "}
                      {item.wifi}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faParking}></FontAwesomeIcon>{" "}
                      {item.parking}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faWheelchair}></FontAwesomeIcon>{" "}
                      {item.disabledParking}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>{" "}
                      {item.bouncers}
                    </li>
                  </ul>
                  <button className="isAvailable" title="Property available">
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </button>
                  <button className="booking" title="Book this property">
                    <Link to={`/booking/${item._id}`} className="links">
                      <FontAwesomeIcon icon={faCreditCardAlt} /> book
                    </Link>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Homepage;
