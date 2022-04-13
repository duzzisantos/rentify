module.exports = (app) => {
  const properties = require("../controllers/admin_controller");
  var router = require("express").Router();

  router.post("/", properties.create);
  router.get("/", properties.findAll);

  router.get("/:id", properties.findOne);
  router.put("/:id", properties.update);
  router.delete("/:id", properties.delete);
  router.delete("/", properties.deleteAll);
  app.use("/api/properties", router);
};
