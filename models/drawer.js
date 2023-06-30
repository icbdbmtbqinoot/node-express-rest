const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const drawerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
drawerSchema.plugin(mongoosePaginate);

const Drawer = mongoose.model("Drawer", drawerSchema);
module.exports = Drawer;
