const router = require('express').Router();
const { signUp, signIn } = require('../controllers/auth.controller');
const { checkExistingUser } = require('../middlewares/verifySignup');


router.post("/signup", checkExistingUser, signUp);
router.post("/signin", signIn);

module.exports = router;