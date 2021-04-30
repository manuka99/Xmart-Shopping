const router = require("express").Router();
const OrderController = require("../controllers/OrderController");

// new order
router.post("/", OrderController.newOrder);

//get the order by id
router.get("/:order_id", OrderController.getOrderDetails);

// save order details including delivery
router.post("/:order_id", OrderController.saveOrderDetails);

module.exports = router;