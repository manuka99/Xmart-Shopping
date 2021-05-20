const express = require("express");
const { getPrivateData } = require("../controller/private");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateData);

module.exports = router;
