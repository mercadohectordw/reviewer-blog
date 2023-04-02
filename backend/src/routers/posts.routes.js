const { getAll, getPost, createPost, updatePost, changeVisibility, deletePost, getPostsByAuthor } = require('../controllers/posts.controller');
const { isAuthor, verifyToken, isAdmin, isAuthorOrAdmin } = require('../middlewares/authJwt');

const router = require('express').Router();

router.get("/", getAll);
router.get("/author/:author_id", getPostsByAuthor);
router.get("/:post_id", getPost);

router.post("/", [verifyToken, isAuthor], createPost);
router.put("/:post_id", [verifyToken, isAuthorOrAdmin], updatePost);
router.put("/visibility/:post_id", [verifyToken, isAdmin], changeVisibility);

router.delete("/:post_id", [verifyToken, isAdmin], deletePost);

module.exports = router;