const express = require("express");
const { authController } = require("./../../controllers/index");

const router = express.Router();

router.get("/invite", authController.inviteInfo);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);

router.patch("/reset-password", authController.resetPassword);
