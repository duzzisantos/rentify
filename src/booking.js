import React from "react"
import './App.css';
import "react-bootstrap"
import "bootstrap"
import Transaction from "./booking-component/transaction"

const Booking = () => {
  return(
      <div className="booking-wrapper">
        <Transaction/>
      </div>
  )
}

export default Booking;