const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

// get all products
router.get("/", ProductController.listProducts);

// save product
router.post("/", ProductController.storeProduct);

// get product based on id
router.get("/:pid", ProductController.findProduct);

// search product
router.get("/search/:text", ProductController.searchProducts);

// update product
router.patch("/:pid", ProductController.updateProduct);

// delete product
router.delete("/:pid", ProductController.deleteProduct);

module.exports = router;