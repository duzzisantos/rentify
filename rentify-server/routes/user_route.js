module.exports = (app) => {
  const users = require("../controllers/user_controller");
  var router = require("express").Router();

  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:username", users.findOne);
  router.put("/:username", users.update);
  router.delete("/", users.deleteAll);
  router.delete("/:username", users.delete);
  app.use("/api/signup", router);
};
