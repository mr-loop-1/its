const express = require("express");
const { authController } = require("./../../controllers/index");
const { authValidator } = require("./../validators");

const router = express.Router();

router.get("/invite", authController.inviteInfo);

router.post("/register", authValidator.register, authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);

router.patch("/reset-password", authController.resetPassword);
