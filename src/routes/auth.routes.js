const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const {verifyToken} = require('../middlewares/auth.middleware.js')

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", verifyToken, authController.me)

module.exports = router;
