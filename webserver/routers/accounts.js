const express = require("express");
const router = express.Router();

// You'll add route handlers here in subsequent tasks
const {
  validate,
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  loginAccount,
} = require("../controller/accounts");

router.get("/api/accounts", getAccounts);
router.get("/api/accounts/:id", getAccountById);
router.post("/api/accounts", validate("add-account"), createAccount);
router.put("/api/accounts/:id", validate("put-account"), updateAccount);
router.delete("/api/accounts/:id", deleteAccount);
router.post("/api/accounts/login", validate("login-account"), loginAccount);

// Export the router
module.exports = router;
