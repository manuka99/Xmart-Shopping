const CartController = require("../controllers/CartController");
const userAuth = require("../middlewares/UserAuth");

const router = require("express").Router();

// add product to the user cart
router.post("/add", userAuth, CartController.addToCart);

// get the user cart
router.get("/", CartController.getCart);

// add, update and delete product , product _quantity from cart
router.post("/", userAuth, CartController.storeToCart);

module.exports = router;
