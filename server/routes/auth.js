const express = require("express");
const { authController } = require("./../controllers");
// const { authValidator } = require("./../validators");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/ping", authController.ping);

module.exports = router;
