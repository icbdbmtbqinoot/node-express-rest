require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.createUser({
      email: email,
      password: hashedPassword,
    });

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "incorrect email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "incorrect email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId);
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createUser,
  login,
  getUser,
};
