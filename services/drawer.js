const Drawer = require("../models/drawer");
const Product = require("../models/product");

const getDrawersByUserId = (userId) => {
  // return Drawer.find({ userId: userId });
  const options = {
    page: 1,
    limit: -1,
  };

  return Drawer.paginate({ userId: userId }, options);
};

const getDrawerByQuery = (query) => {
  return Drawer.findOne(query);
};

const createDrawer = (drawer) => {
  return Drawer.create(drawer);
};

const deleteDrawer = (id) => {
  return Drawer.findByIdAndDelete(id);
};

const removeDrawerFromProducts = async (drawerId) => {
  const drawer = await Drawer.findById(drawerId);
  drawer.products.forEach(async (productId) => {
    await Product.findByIdAndUpdate(productId, {
      $pull: { drawers: drawerId },
    });
  });
};

module.exports = {
  getDrawersByUserId,
  getDrawerByQuery,
  createDrawer,
  deleteDrawer,
  removeDrawerFromProducts,
};
