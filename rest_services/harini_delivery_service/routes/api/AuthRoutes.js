const router = require("express").Router();
const { UserAuth } = require("../../middlewares/UserAuth");
const AuthController = require("../../controllers/AuthController");

// register user
router.post("/register", AuthController.Register);

// login user
router.post("/login", AuthController.Authenticate);

router.get("/profile", UserAuth, AuthController.Profile);

router.post("/validateToken", AuthController.ValidateToken);

module.exports = router;
