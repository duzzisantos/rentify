const db = require("../models");
const Property = db.properties;

//Create
exports.create = (req, res) => {
  if (!req.body.propertyID) {
    res.status(500).send({ message: "Content cannot be empty!" });
    return;
  }

  const property = new Property({
    propertyID: req.body.propertyID,
    propertyName: req.body.propertyName,
    address: req.body.address,
    price: req.body.price,
    photos1: req.body.photos1,
    photos2: req.body.photos2,
    photos3: req.body.photos3,
    photos4: req.body.photos4,
    photos5: req.body.photos5,
    photos6: req.body.photos6,
    wifi: req.body.wifi,
    parking: req.body.parking,
    disabledParking: req.body.disabledParking,
    bouncers: req.body.bouncers,
  });

  property
    .save(property)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while creating new property.",
      });
    });
};

//Read

exports.findAll = (req, res) => {
  const propertyID = req.body.propertyID;
  var condition = propertyID
    ? { propertyID: { $regex: new RegExp(propertyID), $options: "gi" } }
    : {};
  Property.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured in retrieving property.",
      });
    });
};

//Read one

exports.findOne = (req, res) => {
  const propertyID = req.params.propertyID;
  Property.findById(propertyID)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Tutorial with property ID: ${propertyID} not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Error retrieving property ${propertyID}` });
      }
    });
};

//Update

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "You must enter something!",
    });
  }
  const propertyID = req.params.propertyID;
  Property.findByIdAndUpdate(propertyID, req.body, { useFindAndMoodify: false })
    .then((data) => {
      if (!data) {
        res
          .status(500)
          .send({ message: `Cannot update property with id ${propertyID}` });
      } else {
        res.status(200).send({ message: "Property was updated successfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error updating property ${propertyID}` });
    });
};

//Delete

exports.delete = (req, res) => {
  const propertyID = req.params.propertyID;
  Property.findOneAndRemove(propertyID)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete property with id: ${propertyID}` });
      } else {
        res.status(200).send({
          message: `Property ${propertyID} was deleted successfully.`,
        });
      }
    })
    .catch((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Error deleting property ${propertyID}` });
      }
    });
};

//Delete all

exports.deleteAll = (req, res) => {
  Property.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} properties were deleted successfully`,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error in deleting properties!" });
    });
};
