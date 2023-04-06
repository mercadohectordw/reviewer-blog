const { getAll, getUser, updateUser, changePassword, deleteUser, givePermission, deletePermission, getUserByToken, getAuthor, getAllAuthors } = require('../controllers/users.controller');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

const router = require('express').Router();

router.get("/", [verifyToken, isAdmin], getAll);
router.get("/token", verifyToken, getUserByToken);
router.get("/author", getAllAuthors);
router.get("/author/:username", getAuthor);
router.get("/:username", getUser);

router.put("/password/:username", verifyToken, changePassword);
router.put("/permission/:username", [verifyToken, isAdmin], givePermission);
router.put("/:username", verifyToken, updateUser);

router.delete("/permission/:username", [verifyToken, isAdmin], deletePermission);
router.delete("/:username", [verifyToken, isAdmin], deleteUser);

module.exports = router;