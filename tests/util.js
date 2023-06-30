require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user");
const drawerService = require("../services/drawer");
const Product = require("../models/product");
const userPath = "/users";
const signupPath = `${userPath}/signup`;
const loginPath = `${userPath}/login`;
const infoPath = `${userPath}/info`;
const drawerPath = "/drawers";
const productPath = "/products";
const path = {
  userPath,
  signupPath,
  loginPath,
  infoPath,
  drawerPath,
  productPath,
};

const generateTester = async () => {
  try {
    const email = generateRandomEmail();
    const hashedPassword = await bcrypt.hash("password", 10);

    const user = await userService.createUser({
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return { user, token };
  } catch (e) {
    throw new Error(e);
  }
};

const generateRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const domain = "example.com";
  const email = `${randomString}@${domain}`;

  return email;
};

const createTestDrawer = async (userId) => {
  try {
    return await drawerService.createDrawer({
      name: "test-drawer",
      userId: userId,
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getRandomProduct = async () => {
  try {
    const product = await Product.findOne();
    return product;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  path,
  generateTester,
  generateRandomEmail,
  createTestDrawer,
  getRandomProduct,
};
