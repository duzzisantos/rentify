import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import qs from "qs";
import Auth from "./auth/auth";
import Footer from "./footer";

//Material UI Components

const Admins = () => {
  const [createNew, setCreateNew] = useState({
    ID: 0,
    propertyName: "",
    address: "",
    district: "",
    price: "",
    photos1: "",
    photos2: "",
    photos3: "",
    photos4: "",
    photos5: "",
    photos6: "",
    wifi: "Not Available",
    parking: "Not Available",
    disabledParking: "Not Available",
    bouncers: "Not Available",
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/api/properties", qs.stringify(createNew))
      .then((response) => {
        console.log(response.status);
      })
      .catch((err) => {
        console.log("Error in creating new entry!");
        console.log(err);
      });
  };
  return (
    <>
      <Auth />
      <div className="admin-container">
        <h4>Admin Create New</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="propID">Property ID:</label>
          <input
            type="number"
            id="propID"
            value={createNew.ID}
            onChange={(event) =>
              setCreateNew({ ...createNew, ID: event.target.value })
            }
            name="propID"
          />
          <label htmlFor="propName">Property Name:</label>
          <input
            type="text"
            id="propName"
            value={createNew.propertyName}
            onChange={(event) =>
              setCreateNew({ ...createNew, propertyName: event.target.value })
            }
            name="propName"
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={createNew.address}
            onChange={(event) =>
              setCreateNew({ ...createNew, address: event.target.value })
            }
            name="address"
          />
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district"
            value={createNew.district}
            onChange={(event) =>
              setCreateNew({ ...createNew, district: event.target.value })
            }
            name="address"
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={createNew.price}
            onChange={(event) =>
              setCreateNew({ ...createNew, price: event.target.value })
            }
            name="price"
          />
          <label htmlFor="photos">Enter Photo URL:</label>
          <input
            type="text"
            className="photos"
            value={createNew.photos1}
            onChange={(event) =>
              setCreateNew({ ...createNew, photos1: event.target.value })
            }
            name="photos"
            placeholder="https://example.com"
          />
          <input
            type="text"
            className="photos"
            value={createNew.photos2}
            onChange={(event) =>
              setCreateNew({ ...createNew, photos2: event.target.value })
            }
            name="photos"
            placeholder="https://example.com"
          />
          <input
            type="text"
            className="photos"
            value={createNew.photos3}
            onChange={(event) =>
              setCreateNew({ ...createNew, photos3: event.target.value })
            }
            name="photos"
            placeholder="https://example.com"
          />
          <input
            type="text"
            className="photos"
            value={createNew.photos4}
            onChange={(event) =>
              setCreateNew({ ...createNew, photos4: event.target.value })
            }
            name="photos"
            placeholder="https://example.com"
          />
          <input
            type="text"
            className="photos"
            value={createNew.photos5}
            onChange={(event) =>
              setCreateNew({ ...createNew, photos5: event.target.value })
            }
            name="photos"
            placeholder="https://example.com"
          />
          <input
            type="text"
            className="photos"
            value={createNew.photos6}
            onChange={(event) =>
              setCreateNew({ ...createNew, photos6: event.target.value })
            }
            name="photos"
            placeholder="https://example.com"
          />
          <span>Amenities:</span>
          <label className="checkbox-label" htmlFor="wifi">
            Wi-Fi
          </label>
          <input
            type="text"
            name="wifi"
            onChange={(event) =>
              setCreateNew({ ...createNew, wifi: event.target.value })
            }
            id="wifi"
            value={createNew.wifi}
          />
          <label className="checkbox-label" htmlFor="parking">
            Parking
          </label>
          <input
            type="text"
            name="parking"
            onChange={(event) =>
              setCreateNew({ ...createNew, parking: event.target.value })
            }
            id="parking"
            value={createNew.parking}
          />
          <label className="checkbox-label" htmlFor="dis-parking">
            Disabled parking
          </label>
          <input
            type="text"
            name="dis-parking"
            onChange={(event) =>
              setCreateNew({
                ...createNew,
                disabledParking: event.target.value,
              })
            }
            id="dis-parking"
            value={createNew.disabledParking}
          />
          <label className="checkbox-label" htmlFor="bouncers">
            Bouncers
          </label>
          <input
            type="text"
            name="bouncers"
            onChange={(event) =>
              setCreateNew({ ...createNew, bouncers: event.target.value })
            }
            id="bouncers"
            value={createNew.bouncers}
          />
          <button type="submit" id="admin-btn" title="Create new property">
            Create
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default Admins;
