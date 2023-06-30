const controller = require("../controllers/drawer");
const middleware = require("../middleware/middleware");
const router = require("express").Router();

router.get("/", middleware.authenticateUser, controller.getDrawers);
router.post("/", middleware.authenticateUser, controller.createDrawer);
router.delete("/:id", middleware.authenticateUser, controller.deleteDrawer);

module.exports = router;
