const BookingSchema = require("../models/booking_model");
// const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  if (!req.body.propertyName) {
    res.send({ message: "Booking is empty!" });
    return;
  }

  const booking = new BookingSchema({
    ID: req.body.ID,
    propertyName: req.body.propertyName,
    price: req.body.price,
    days: req.body.days,
    totalAmount: req.body.totalAmount,
    creditCard: req.body.creditCard,
    expiryDate: req.body.expiryDate,
    cvc: req.body.cvc,
  });

// //   Hash the credit card details
//   const salt = await bcrypt.genSalt(10);
//   booking.creditCard = await bcrypt.hash(booking.creditCard, salt);
//   booking.cvc = await bcrypt.hash(booking.cvc, salt);
//   booking.expiryDate = await  bcrypt.hash(booking.expiryDate, salt);

  booking
    .save(booking)
    .then((data) => {
      res.json(data)
      console.log("Booking successfully created!");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findAll = (req, res) => {
  const propertyID = req.query.id;
  var condition = propertyID
    ? { $regex: new RegExp(propertyID), $options: "gi" }
    : {};
  BookingSchema.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  BookingSchema.findById(id).then((data) => {
    !data ? res.json({ message: "Vendor not found" }) : res.json(data);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  BookingSchema.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.status(200).json(data);
      console.log("Booking updated successfully!");
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  BookingSchema.findByIdAndRemove(id)
    .then((data) => {
      !data
        ? res.status(404).json({ message: "Forbidden request" })
        : res.json(data);
      console.log("Booking was successfully deleted!");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteAll = (req, res) => {
  BookingSchema.deleteMany({})
    .then((data) => {
      res.status(200).json({
        message: "All bookings have been deleted!",
      });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
