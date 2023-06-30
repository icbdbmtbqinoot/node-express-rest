const drawerService = require("../services/drawer");
const productService = require("../services/product");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProductsByDrawerId(
      req.query.drawerId
    );
    res.status(200).json({ products });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const likeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { drawerName } = req.body;

    const drawers = await drawerService.getDrawersByUserId(req.userId);
    if (drawers.length === 0) {
      return res.status(400).json({ message: "No drawer exists" });
    }

    const hasLiked = drawers.docs.some((drawer) =>
      drawer.products.includes(productId)
    );
    if (hasLiked) {
      return res.status(400).json({ message: "Already liked in other drawer" });
    }

    await productService.addDrawer(productId, drawerName, req.userId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const dislikeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { drawerName } = req.body;

    await productService.removeDrawer(productId, drawerName, req.userId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getProducts,
  likeProduct,
  dislikeProduct,
};
