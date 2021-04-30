const CartController = require("../controllers/CartController");

const router = require("express").Router();

router.get("/", CartController.getCart);
router.post("/", CartController.storeToCart);

module.exports = router;