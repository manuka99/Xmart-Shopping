const GatewayController = require("../controllers/GatewayController");

const router = require("express").Router();

router.post("/", GatewayController.makePayment);

module.exports = router;