const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const userAuth = require("../middlewares/UserAuth");

// new order
router.post("/", userAuth, OrderController.newOrder);

//get the order by id
router.get("/:order_id", OrderController.getOrderDetails);

// save order details including delivery
router.post("/:order_id", userAuth, OrderController.saveOrderDetails);

module.exports = router;
