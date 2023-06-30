const User = require("../models/user");

const createUser = (user) => {
  return User.create(user);
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getUserById = (id) => {
  return User.findById(id);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
