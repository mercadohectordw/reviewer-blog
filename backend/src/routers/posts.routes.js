const { getAll, getPost, createPost, updatePost, changeVisibility, deletePost } = require('../controllers/posts.controller');
const { isAutor, verifyToken, isAdmin, isAutorOrAdmin } = require('../middlewares/authJwt');

const router = require('express').Router();

router.get("/", getAll);
router.get("/:post_id", getPost);

router.post("/", [verifyToken, isAutor], createPost);
router.put("/:post_id", [verifyToken, isAutorOrAdmin], updatePost);
router.put("/visibility/:post_id", [verifyToken, isAdmin], changeVisibility);

router.delete("/:post_id", [verifyToken, isAdmin], deletePost);

module.exports = router;