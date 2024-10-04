const express = require("express");
const router = express.Router();

// You'll add route handlers here in subsequent tasks
const {
  validate,
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/posts");

router.get("/api/posts", getPosts);
router.get("/api/posts/:id", getPostById);
router.post("/api/posts", validate("add-post"), createPost);
router.put("/api/posts/:id", validate("put-post"), updatePost);
router.delete("/api/posts/:id", deletePost);

// Export the router
module.exports = router;
