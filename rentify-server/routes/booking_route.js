module.exports = (app) => {
  const booking = require("../controllers/booking_controller");
  var router = require("express").Router();

  router.post("/", booking.create);
  router.get("/", booking.findAll);
  router.get("/:id", booking.findOne);
  router.put("/:id", booking.update);
  router.delete("/", booking.delete);
  router.delete("/:id", booking.deleteAll);
  app.use("/api/booking", router);
};
