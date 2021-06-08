const { Router } = require("express");
const { getPosts, addPost, deletePost } = require("../controllers/posts");
const router = new Router();

router.get("", getPosts);
router.post("/create", addPost);
router.delete("/delete", deletePost);

module.exports = router;
