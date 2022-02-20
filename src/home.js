import "./App.css";
import "react-router-dom";
import React from "react";

const Homepage = () => {
  return (
    <>
      <div className="hero">
        <div id="hero-text">
          <h1>Your go-to platform for property rentals in Philadelphia.</h1>
        </div>
      </div>
      <div className="filter-property">
        <h4>Search for event centers</h4>
        {/* <h6>Apply filters</h6> */}
        <form>
          <span>Price range:</span>
          <label htmlFor="100200">100 to 200 USD:</label>
          <input type="checkbox" id="100200" name="100200" />
          <label htmlFor="201400">201 to 400 USD:</label>
          <input type="checkbox" id="201400" name="201400" />
          <label htmlFor="401600">401 to 600 USD:</label>
          <input type="checkbox" id="401600" name="401600" />
          <label htmlFor="601000">601 to 1000 USD:</label>
          <input type="checkbox" id="601000" name="601000" />

          <span>District:</span>
          <label htmlFor="north">North Philadelphia:</label>
          <input type="checkbox" id="north" name="north" />
          <label htmlFor="south">South Philadelphia:</label>
          <input type="checkbox" id="south" name="north" />
          <label htmlFor="east">East Philadelphia:</label>
          <input type="checkbox" id="east" name="east" />
          <label htmlFor="west">West Philadelphia:</label>
          <input type="checkbox" id="west" name="west" />
          <label htmlFor="center">Center City:</label>
          <input type="checkbox" id="center" name="center" />

          <span>Amenities:</span>
          <label htmlFor="parking">Parking:</label>
          <input type="checkbox" id="parking" name="parking" />
          <label htmlFor="wifi">Wi-Fi:</label>
          <input type="checkbox" id="wifi" name="wifi" />
          <label htmlFor="disabled">Disabled parking:</label>
          <input type="checkbox" id="parking" name="parking" />
          <label htmlFor="bouncers">Bouncers:</label>
          <input type="checkbox" id="bouncers" name="bouncers" />
          <button type="submit" id="search-btn">Search</button>
        </form>

        <div id="display-results">
         <h4>Results</h4>
        </div>
      </div>
    </>
  );
};

export default Homepage;
