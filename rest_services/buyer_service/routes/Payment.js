const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const userAuth = require("../middlewares/UserAuth");

// receive order comple notification from gateways
router.post("/notify", OrderController.paymentOrderNotification);

// complete cod order
router.post("/pay/cod", userAuth, OrderController.codPayment);

module.exports = router;