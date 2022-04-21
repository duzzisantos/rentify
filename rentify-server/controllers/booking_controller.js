const db = require("../models");
const Booking = db.booking;

exports.create = (req, res) => {
  if (!req.body) {
    res.send({ message: "Booking is empty!" });
    return;
  }

  const booking = new Booking({
    ID: req.body.ID,
    propertyName: req.body.propertyName,
    price: req.body.price,
    days: req.body.days,
    totalAmount: req.body.totalAmount,
    creditCard: req.body.creditCard,
    expiryDate: req.body.expiryDate,
    cvc: req.body.cvc,
  });

  booking
    .save(booking)
    .then((res) => {
      res.json({ message: "Booking successfully created!" });
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
  Booking.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Booking.findById(id).then((data) => {
    !data ? res.json({ message: "Vendor not found" }) : res.json(data);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Booking.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
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
  Booking.findByIdAndRemove(id)
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
  Booking.deleteMany({})
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
