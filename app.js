require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("failed to connect to MongoDB:", error);
  });

app.use(express.json());
app.use("/users", require("./routes/user"));
app.use("/drawers", require("./routes/drawer"));
app.use("/products", require("./routes/product"));

module.exports = app;
