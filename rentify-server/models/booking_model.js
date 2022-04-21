const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  ID: Number,
  propertyName: String,
  price: Number,
  days: Number,
  totalAmount: Number,
  creditCard: Number,
  expiryDate: String,
  cvc: Number,
});

module.exports = mongoose.model("booking", BookingSchema);
