const User = require("./user_model");
const bcrypt = require("bcryptjs");

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  bcrypt.compare(password, user.password);
  return { ...user.toJSON() };
};

module.exports = {
  login,
};
