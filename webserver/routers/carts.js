const express = require("express");
const router = express.Router();

// You'll add route handlers here in subsequent tasks
const {
  validate,
  getActiveCartByAccountId,
  addItemToAccountCart,
  updateAccountCart,
  deleteItemInAccountCart,
} = require("../controller/carts");

router.get("/api/account/:id/cart", getActiveCartByAccountId);
router.post(
  "/api/account/:id/cart",
  validate("add-cart"),
  addItemToAccountCart
);
router.put("/api/account/:id/cart", validate("put-cart"), updateAccountCart);
router.delete("/api/account/:id/cart/:itemid", deleteItemInAccountCart);

// Export the router
module.exports = router;
