const controller = require("../controllers/user");
const middleware = require("../middleware/middleware");
const router = require("express").Router();

router.post("/signup", controller.createUser);
router.post("/login", controller.login);
router.get("/info", middleware.authenticateUser, controller.getUser);

module.exports = router;
