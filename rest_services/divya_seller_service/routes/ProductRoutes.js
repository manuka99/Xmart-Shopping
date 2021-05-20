const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

// save product
router.post("/", ProductController.saveProduct);

// update product
router.put("/:pid", ProductController.saveProduct);

// get all products
router.get("/", ProductController.listProducts);

// get product based on id
router.get("/:pid", ProductController.findProduct);

// delete product
router.delete("/:pid", ProductController.deleteProduct);

module.exports = router;
