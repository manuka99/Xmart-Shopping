const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const userAuth = require("../middlewares/UserAuth");

router.post("/", userAuth, OrderController.newOrder);
router.get("/:order_id", userAuth, OrderController.getOrderDetails);
router.post("/:order_id", userAuth, OrderController.saveOrderDetails);
router.post("/pay/:order_id", userAuth, OrderController.orderPayment);

module.exports = router;