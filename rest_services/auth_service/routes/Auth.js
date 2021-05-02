const router = require("express").Router();
const { GuestUser } = require("../middlewares/GuestUser");
const User = require("../model/User");
const {
  register,
  authenticate,
  userAuth,
  validateJWTToken,
} = require("../util/Auth");

router.get("/", async (req, res) =>
  res.send("<h1>Authentication service</h1>")
);

router.post(
  "/register",
  GuestUser,
  async (req, res) => await register(req.body, "user", res)
);

router.post(
  "/login",
  GuestUser,
  async (req, res) => await authenticate(req.body, res)
);

router.post("/logout", userAuth, async (req, res) => {
  req.logOut();
  return res.status(200).json({ message: "You have successfully logout" });
});

router.get("/profile", userAuth, async (req, res) => res.send(req.user));

router.post("/validateToken", async (req, res) => {
  var decodedToken = validateJWTToken(req.body.token);
  var user = await User.findById(decodedToken.user_id);
  return res.json(user);
});

module.exports = router;
