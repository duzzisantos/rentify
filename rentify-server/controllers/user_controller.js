const db = require("../models");
const SignUp = db.users;
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body.username) {
    res.status(500).send({
      message: "Username is required!",
    });
    return;
  }

  const signup = new SignUp({
    username: req.body.username,
    password: req.body.password,
  });

  signup
    .save(signup)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({
          message: "Error creating new user!",
        });
      }
    });
};

// exports.findOne = (req, res) => {
//   const userName = req.body.username;
//   SignUp.findOne({ username: userName })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: "User Not Found",
//         });
//       } else {
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       if (err) {
//         console.log(err);
//         res.status(404).send({
//           message: "Check username and try again",
//         });
//       }
//     });
// };

exports.findOne = (req, res) => {
  const user = req.body.username;
  const hashedPassword = SignUp.password;

  SignUp.findOne({ username: user, unique: true })
    .then((data) => {
      if (!data) {
        console.log("User exists");
      } else if (bcrypt.compare(req.body.password, hashedPassword)) {
        console.log("Login successful");
        res.status(201);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.findAll = (req, res) => {
  const userName = req.body.username;
  var condition = userName
    ? { username: { $regex: new RegExp(userName), $options: "gi" } }
    : {};
  SignUp.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured in retrieving property.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "You must enter something!",
    });
  }
  const userName = req.body.username;
  SignUp.findOneAndUpdate(userName, req.body, { useFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.status(500).send({
          message: `User cannot be updated with username ${userName}`,
        });
      } else {
        res
          .status(200)
          .send({
            message: "User was updated successfully",
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
    }
  );
};

exports.delete = (req, res) => {
  const userName = req.body.username;
  SignUp.findOneAndRemove(userName).then((data) => {
    if (!data) {
      res.status(500).send({
        message: "User cannot be deleted",
      });
    } else {
      res
        .status(200)
        .send({
          message: "User successfully removed",
        })
        .catch((err) => {
          return err ? console.log(err) : !err;
        });
    }
  });
};

exports.deleteAll = (req, res) => {
  SignUp.deleteMany({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};
