const express = require("express");
const UserController = require("../controllers/user.controller");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/signup", UserController.signUp);
api.post("/signin", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);

module.exports = api;
/*
const express = require("express");
const middleware_auth= require('../middleware/authenticated')
const { signUp, signIn , getUsers} = require("../controllers/user.controller");

const router = express();

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route("/users",middleware_auth.ensureAuth).get(getUsers);

module.exports = router;
*/