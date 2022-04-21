const dbConfig = require("../config/config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.properties = require("./admin_model")(mongoose);
db.users = require("./user_model")(mongoose);
db.login = require("./login")(mongoose)
db.booking = require("./booking_model")(mongoose)
module.exports = db;
