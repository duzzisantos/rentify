module.exports = (app) => {
  const { storage } = require("../cloudinary");
  const multer = require("multer");
  const upload = multer({ storage });
  const properties = require("../controllers/admin_controller");
  var router = require("express").Router();

  router.post(
    "/",
    properties.create,
    upload.array("photos"),
    (req, res) => {
      console.log(req.body, req.files);
      res.send("It worked!");
    }
  );
  router.get("/", properties.findAll);
  router.get("/:Id", properties.findOne);
  router.put("/:id", properties.update);
  router.delete("/:id", properties.delete);
  router.delete("/", properties.deleteAll);
  app.use("/api/properties", router);
};
