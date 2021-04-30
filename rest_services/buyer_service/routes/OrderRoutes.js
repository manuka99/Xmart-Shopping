const router = require("express").Router();
const OrderController = require("../controllers/OrderController");

router.post("/", OrderController.newOrder);
router.get("/:order_id", OrderController.getOrderDetails);
router.post("/:order_id", OrderController.saveOrderDetails);
router.post("/pay/:order_id", OrderController.orderPayment);

module.exports = router;