const GatewayController = require("../controllers/GatewayController");

const router = require("express").Router();

router.post("/", GatewayController.makePayment);

router.post("/request-pin/:number", GatewayController.requestPin);

module.exports = router;
