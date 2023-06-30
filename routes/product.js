const controller = require("../controllers/product");
const middleware = require("../middleware/middleware");
const router = require("express").Router();

router.get("/", middleware.authenticateUser, controller.getProducts);
router.patch("/:id/like", middleware.authenticateUser, controller.likeProduct);
router.patch(
  "/:id/dislike",
  middleware.authenticateUser,
  controller.dislikeProduct
);

module.exports = router;
