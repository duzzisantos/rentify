import React, { useState, useEffect } from "react";
import "./App.css";
import "react-bootstrap";
import "bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Auth from "./auth/auth";
import Footer from "./footer";

const Booking = () => {
  const params = useParams();
  let navigate = useNavigate();

  //data from get request
  const [ID, setID] = useState(0);
  const [propertyName, setPropertyName] = useState("");
  const [price, setPrice] = useState(0);

  //additional data for post request
  const [days, setDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [creditCard, setCreditCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    axios
      .get(`https://desolate-shore-41320.herokuapp.com/properties/${params.ID}`)
      .then((res) => {
        console.log(res.statusText);
        const bookingData = res.data;
        setID(bookingData.ID);
        setPropertyName(bookingData.propertyName);
        setPrice(bookingData.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.ID]);

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/api/booking", {
        ID,
        propertyName,
        price,
        days,
        totalAmount,
        creditCard,
        expiryDate,
        cvc,
      })
      .then((res) => {
        console.log(res.statusText);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Auth />
      <div className="booking-wrapper">
        <h3>Booking</h3>
        <div className="my-booking">
          <form onSubmit={handleSubmit}>
            <label>Property ID</label>
            <input
              type="number"
              value={ID}
              onChange={(e) => setID(e.target.value)}
            />
            <label>Property Name</label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
            <label>Price</label>
            <input
              disabled
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>How many days?</label>
            <input
              type="number"
              value={days}
              name="days"
              onChange={(e) => setDays(e.target.value)}
            />
            <label>Total amount</label>
            <input
              disabled
              type="number"
              value={price * days}
              name="totalAmount"
              onChange={(e) => setTotalAmount(e.target.value)}
            />
            <label>Credit card details</label>
            <input
              type="text"
              value={creditCard}
              name="creditCard"
              onChange={(e) => setCreditCard(e.target.value)}
            />
            <label>Expiry date</label>
            <input
              type="text"
              placeholder="MMYYYY"
              value={expiryDate}
              name="expiryDate"
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <label>CVC</label>
            <input
              type="text"
              value={cvc}
              name="cvc"
              onChange={(e) => setCvc(e.target.value)}
            />
            <button type="submit" id="admin-btn">
              Book
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Booking;
