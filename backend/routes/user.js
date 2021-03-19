const express = require("express");
const { signUp, signIn , getUsers} = require("../controllers/user.controller");

const router = express();

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route("/users").get(getUsers);

module.exports = router;
