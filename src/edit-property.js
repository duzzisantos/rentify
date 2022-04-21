import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./tables";

const EditProperty = () => {
  const params = useParams();
  let navigate = useNavigate();

  const [ID, setID] = useState(0);
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [price, setPrice] = useState("");
  const [photos1, setPhotos1] = useState("");
  const [photos2, setPhotos2] = useState("");
  const [photos3, setPhotos3] = useState("");
  const [photos4, setPhotos4] = useState("");
  const [photos5, setPhotos5] = useState("");
  const [photos6, setPhotos6] = useState("");
  const [wifi, setWifi] = useState("");
  const [parking, setParking] = useState("");
  const [disabledParking, setDisabledParking] = useState("");
  const [bouncers, setBouncers] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/properties/${params.ID}`)
      .then((res) => {
        console.log(params.ID);
        const propertyData = res.data;
        console.log(propertyData);
        setID(propertyData.ID);
        setPropertyName(propertyData.propertyName);
        setAddress(propertyData.address);
        setDistrict(propertyData.district);
        setPrice(propertyData.price);
        setPhotos1(propertyData.photos1);
        setPhotos2(propertyData.photos2);
        setPhotos3(propertyData.photos3);
        setPhotos4(propertyData.photos4);
        setPhotos5(propertyData.photos5);
        setPhotos6(propertyData.photos6);
        setWifi(propertyData.wifi);
        setParking(propertyData.parking);
        setDisabledParking(propertyData.disabledParking);
        setBouncers(propertyData.bouncers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.ID]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:4000/api/properties/${params.ID}`, {
        ID,
        propertyName,
        address,
        district,
        price,
        photos1,
        photos2,
        photos3,
        photos4,
        photos5,
        photos6,
        wifi,
        parking,
        disabledParking,
        bouncers,
      })
      .then((res) => {
        navigate("/tables");
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="edit-container">
      <h3>Update Property</h3>
      <form encType="multipart/form-data">
        <label htmlFor="ID">ID:</label>
        <input
          disabled
          type="number"
          id="ID"
          name="ID"
          value={ID}
          onChange={(event) => setID(event.target.value)}
        />
        <label htmlFor="propertyName">Property Name:</label>
        <input
          type="text"
          id="propertyName"
          value={propertyName}
          onChange={(event) => setPropertyName(event.target.value)}
          name="propertyName"
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          name="address"
        />
        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          name="district"
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          name="price"
        />
        <label htmlFor="photos">Enter Photo URL:</label>
        <input
          type="text"
          className="photos"
          value={photos1}
          onChange={(event) => setPhotos1(event.target.value)}
          name="photos1"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={photos2}
          onChange={(event) => setPhotos2(event.target.value)}
          name="photos2"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={photos3}
          onChange={(event) => setPhotos3(event.target.value)}
          name="photos3"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={photos4}
          onChange={(event) => setPhotos4(event.target.value)}
          name="photos4"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={photos5}
          onChange={(event) => setPhotos5(event.target.value)}
          name="photos5"
          placeholder="https://example.com"
        />
        <input
          type="text"
          className="photos"
          value={photos6}
          onChange={(event) => setPhotos6(event.target.value)}
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
          onChange={(event) => setWifi(event.target.value)}
          id="wifi"
          value={wifi}
        />
        <label className="checkbox-label" htmlFor="parking">
          Parking
        </label>
        <input
          type="text"
          name="parking"
          onChange={(event) => setParking(event.target.value)}
          id="parking"
          value={parking}
        />
        <label className="checkbox-label" htmlFor="dis-parking">
          Disabled parking
        </label>
        <input
          type="text"
          name="disabledParking"
          onChange={(event) => setDisabledParking(event.target.value)}
          id="dis-parking"
          value={disabledParking}
        />
        <label className="checkbox-label" htmlFor="bouncers">
          Bouncers
        </label>
        <input
          type="text"
          name="bouncers"
          onChange={(event) => setBouncers(event.target.value)}
          id="bouncers"
          value={bouncers}
        />
        <button type="submit" id="admin-btn" onClick={(ID, e) => handleUpdate(ID, e)}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
