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
    district: req.body.district,
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

// Read one

exports.findOne = (req, res) => {
  const propertyID = req.params.id;
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

//Read by ID

// exports.findOne = (req, res, next) => {
//   Property.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// };
//Update

exports.update = (req, res) => {
  Property.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, data, next) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.json({
          message: data,
        });
        console.log("Successfully updated property.");
      }
    }
  );
};

//Delete

exports.delete = (req, res) => {
  const id = req.params.id;
  Property.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete property with id: ${id}` });
      } else {
        res.status(200).send({
          message: `Property ${id} was deleted successfully.`,
        });
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: `Error deleting property ${id}` });
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
