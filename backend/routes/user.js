const express = require("express");
const UserController = require("../controllers/user.controller");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");
const User = require("../models/User");
const md_upload_avatar = multiparty({
    uploadDir: "./uploads/avatar"
});
const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
api.put("/upload-avatar/:id", [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", UserController.getAvatar);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put("/activate-user/:id", [md_auth.ensureAuth], UserController.activateUser);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);

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