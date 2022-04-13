const dbConfig = require("../config/config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.properties = require("./admin_model")(mongoose);
db.users = require("./user_model")(mongoose);
db.login = require("./login")(mongoose)
module.exports = db;
