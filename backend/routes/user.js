const express = require("express");
const { signUp, signIn } = require("../controllers/user.controller");

const router = express();

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

module.exports = router;
