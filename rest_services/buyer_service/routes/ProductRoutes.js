const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.listProducts);

router.post("/", ProductController.storeProduct);

router.get("/:pid", ProductController.findProducts);

router.patch("/:pid", ProductController.updateProduct);

router.delete("/:pid", ProductController.deleteProduct);

module.exports = router;