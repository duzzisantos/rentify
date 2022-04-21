import React, { useState, useEffect } from "react";
import "./App.css";
import "react-bootstrap";
import "bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const params = useParams();
  let navigate = useNavigate();
  const [ID, setID] = useState(0);
  const [propertyName, setPropertyName] = useState("");
  const [price, setPrice] = useState(0);

  const [payment, setPayment] = useState({
    days: 0,
    totalAmount: 0,
    creditCard: 0,
    expiryDate: "",
    cvc: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/properties/${params.ID}`)
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
        payment,
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
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>How many days?</label>
          <input
            type="number"
            value={payment.days}
            name="days"
            onChange={(e) => setPayment({ ...payment, days: e.target.value })}
          />
          <label>Total amount</label>
          <input
            type="text"
            value={payment.days * price}
            name="totalAmount"
            onChange={(e) =>
              setPayment({
                ...payment,
                totalAmount: e.target.value,
              })
            }
          />
          <label>Credit card details</label>
          <input
            type="number"
            value={payment.creditCard}
            name="creditCard"
            onChange={(e) =>
              setPayment({ ...payment, creditCard: e.target.value })
            }
          />
          <label>Expiry date</label>
          <input
            type="text"
            placeholder="MM/YYYY"
            value={payment.expiryDate}
            name="expiryDate"
            onChange={(e) =>
              setPayment({ ...payment, expiryDate: e.target.value })
            }
          />
          <label>CVC</label>
          <input
            type="number"
            value={payment.cvc}
            name="cvc"
            onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
          />
          <button type="submit" id="admin-btn">
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
