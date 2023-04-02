const { changeVisibility, getCommentsByPost, createComment, updateComment, deleteComment, getCommentsByUser } = require('../controllers/comments.controller');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

const router = require('express').Router();

router.get("/user/:user_id", getCommentsByUser);
router.get("/:post_id", getCommentsByPost);

router.post("/:post_id", verifyToken, createComment);
router.put("/:comment_id", verifyToken, updateComment);
router.put("/visibility/:comment_id", [verifyToken, isAdmin], changeVisibility);

router.delete("/:comment_id", verifyToken, deleteComment);

module.exports = router;