const CartController = require("../controllers/CartController");

const router = require("express").Router();
// get the user cart
router.get("/", CartController.getCart);
// add, update and delete product , product _quantity from cart
router.post("/", CartController.storeToCart);

module.exports = router;