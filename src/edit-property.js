import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./listings";


const EditProperty = () => {
  const [editNew, seteditNew] = useState({
    propertyID: 0,
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

  const fetchProperty = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/properties/`, id
      );
      seteditNew(response.data);
      console.log(response.statusText);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  const handleUpdate = (id) => {
    axios
      .put("http://localhost:4000/api/properties", id, editNew)
      .then((res) => {
        console.log(res.statusText);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="edit-container">
      {}
      <form encType="multipart/form-data" key={editNew.id}>
        <label htmlFor="propertyID">Property ID:</label>
        <input
          type="number"
          id="propertyID"
          name="propertyID"
          value={editNew.propertyID}
          onChange={(event) =>
            seteditNew({ ...editNew, propertyID: event.target.value })
          }
        />
        <label htmlFor="propName">Property Name:</label>
        <input
          type="text"
          id="propertyName"
          value={editNew.propertyName}
          onChange={(event) =>
            seteditNew({ ...editNew, propertyName: event.target.value })
          }
          name="propertyName"
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={editNew.address}
          onChange={(event) =>
            seteditNew({ ...editNew, address: event.target.value })
          }
          name="address"
        />
        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          value={editNew.district}
          onChange={(event) =>
            seteditNew({ ...editNew, district: event.target.value })
          }
          name="district"
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={editNew.price}
          onChange={(event) =>
            seteditNew({ ...editNew, price: event.target.value })
          }
          name="price"
        />
        <label htmlFor="photos">Enter Photo URL:</label>
        <input
          type="text"
          className="photos"
          value={editNew.photos1}
          onChange={(event) =>
            seteditNew({ ...editNew, photos1: event.target.value })
          }
          name="photos1"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={editNew.photos2}
          onChange={(event) =>
            seteditNew({ ...editNew, photos2: event.target.value })
          }
          name="photos2"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={editNew.photos3}
          onChange={(event) =>
            seteditNew({ ...editNew, photos3: event.target.value })
          }
          name="photos3"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={editNew.photos4}
          onChange={(event) =>
            seteditNew({ ...editNew, photos4: event.target.value })
          }
          name="photos4"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={editNew.photos5}
          onChange={(event) =>
            seteditNew({ ...editNew, photos5: event.target.value })
          }
          name="photos5"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={editNew.photos6}
          onChange={(event) =>
            seteditNew({ ...editNew, photos6: event.target.value })
          }
          name="photos6"
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
            seteditNew({ ...editNew, wifi: event.target.value })
          }
          id="wifi"
          value={editNew.wifi}
        />
        <label className="checkbox-label" htmlFor="parking">
          Parking
        </label>
        <input
          type="text"
          name="parking"
          onChange={(event) =>
            seteditNew({ ...editNew, parking: event.target.value })
          }
          id="parking"
          value={editNew.parking}
        />
        <label className="checkbox-label" htmlFor="dis-parking">
          Disabled parking
        </label>
        <input
          type="text"
          name="disabledParking"
          onChange={(event) =>
            seteditNew({ ...editNew, disabledParking: event.target.value })
          }
          id="dis-parking"
          value={editNew.disabledParking}
        />
        <label className="checkbox-label" htmlFor="bouncers">
          Bouncers
        </label>
        <input
          type="text"
          name="bouncers"
          onChange={(event) =>
            seteditNew({ ...editNew, bouncers: event.target.value })
          }
          id="bouncers"
          value={editNew.bouncers}
        />
        <button type="submit" id="admin-btn" onClick={handleUpdate}>
          Update property
        </button>
      </form>
    </div>
  );
};

export default EditProperty;


