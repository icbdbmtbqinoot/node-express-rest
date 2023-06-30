const Drawer = require("../models/drawer");
const Product = require("../models/product");

const getProductsByDrawerId = (drawerId) => {
  // return Product.find({ drawers: drawerId });
  const options = {
    page: 1,
    limit: -1,
  };

  return Product.paginate({ drawers: drawerId }, options);
};

const addDrawer = async (productId, drawerName, userId) => {
  try {
    const drawer = await Drawer.findOne({ name: drawerName, userId: userId });
    drawer.products.push(productId);
    await drawer.save();

    const product = await Product.findById(productId);
    product.drawers.push(drawer._id);
    await product.save();

    return;
  } catch (e) {
    throw new Error(e);
  }
};

const removeDrawer = async (productId, drawerName, userId) => {
  try {
    const drawer = await Drawer.findOne({ name: drawerName, userId: userId });
    drawer.products.pull(productId);
    await drawer.save();

    const product = await Product.findById(productId);
    product.drawers.pull(drawer._id);
    await product.save();

    return;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getProductsByDrawerId,
  addDrawer,
  removeDrawer,
};
