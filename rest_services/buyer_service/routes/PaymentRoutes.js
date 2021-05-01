const router = require("express").Router();
const PaymentController = require("../controllers/PaymentController");
const userAuth = require("../middlewares/UserAuth");

// receive order comple notification from gateways
router.post("/notify", PaymentController.paymentOrderNotification);

// complete cod order
router.post("/pay/cod", userAuth, PaymentController.codPayment);

module.exports = router;