const express = require("express");
const router = express.Router();

// You'll add route handlers here in subsequent tasks
const {
  validate,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/products");

router.get("/api/product", getProducts);
router.get("/api/product/:id", getProductById);
router.post("/api/product", validate("add-product"), createProduct);
router.put("/api/product/:id", validate("put-product"), updateProduct);
router.delete("/api/product/:id", deleteProduct);

// Export the router
module.exports = router;
