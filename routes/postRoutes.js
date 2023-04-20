const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPosts).post(protect, setPost);
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

// router.get("/", getPosts);

// router.post("/", setPost);

// router.put("/:id", updatePost);

// router.delete("/:id", deletePost);

module.exports = router;
