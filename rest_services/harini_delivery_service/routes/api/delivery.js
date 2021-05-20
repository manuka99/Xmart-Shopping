const express = require("express");
const router = express.Router();
const DeliveryController = require("../../controllers/DeliveryController");

//Create delivery POST
router.post("/", DeliveryController.newDelivery);

// UPDATE delivery  api/delete/:id
router.patch("/:id", DeliveryController.updateDelivery);

// DELETE delivery  api/delete/:id
router.delete("/:id", DeliveryController.deleteDelivery);

// GET all deliveries
router.get("/", DeliveryController.listAllDelivery);

// GET one delivery
router.get("/:id", DeliveryController.findDelivery);

module.exports = router;
