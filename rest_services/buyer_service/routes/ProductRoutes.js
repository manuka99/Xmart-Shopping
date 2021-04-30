const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.listProducts);

router.post("/", ProductController.storeProduct);

router.get("/:pid", ProductController.findProduct);

router.get("/search/:text", ProductController.searchProducts);

router.patch("/:pid", ProductController.updateProduct);

router.delete("/:pid", ProductController.deleteProduct);

module.exports = router;