const router = require("express").Router();
const User = require("../model/User");
const AuthController = require("../controllers/AuthController");
const { UserAuth } = require("../middlewares/UserAuth");

router.get("/", async (req, res) =>
  res.send("<h1>Authentication service</h1>")
);

// register user
router.post("/register", AuthController.Register);

// login user
router.post("/login", AuthController.Authenticate);

router.post("/logout", UserAuth, AuthController.Logout);

router.get("/profile", UserAuth, AuthController.Profile);

// validate token
router.post("/validateToken", AuthController.ValidateToken);

module.exports = router;
