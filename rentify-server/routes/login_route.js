module.exports = (app) => {
  const express = require("express");
  var router = express.Router();
  const user = require("..controllers/login");

  router.post("/api/login", (req, res, next) => {
    const { username, password } = req.body;
    user
      .login(username, password)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        next(err);
      });
  });

  app.use("/api/login", router);
};
