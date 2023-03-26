const { getAll, getUser, updateUser, changePassword, deleteUser } = require('../controllers/users.controller');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

const router = require('express').Router();

router.get("/", getAll);
router.get("/:username", getUser);

router.put("/password/:username", verifyToken, changePassword);
router.put("/:username", verifyToken, updateUser);

router.delete("/:username", [verifyToken, isAdmin], deleteUser);

module.exports = router;