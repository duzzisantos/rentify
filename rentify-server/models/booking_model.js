const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    ID: Number,
    propertyName: String,
    price: Number,
    days: Number,
    totalAmount: {
      type: Number,
    },
    creditCard: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    cvc: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", BookingSchema);
