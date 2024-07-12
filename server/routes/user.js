const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");
// router.get("/", userController.get_users_list);
router.post("/register", userController.register_user);
router.post("/login", userController.login_user);
router.get("/list", userController.get_users_list);

module.exports = router;