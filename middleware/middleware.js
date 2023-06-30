const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: e.message });
  }
};

module.exports = {
  authenticateUser,
};
