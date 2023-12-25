const express = require("express");
const { authController } = require("./../controllers");
// const { authValidator } = require("./../validators");

const router = express.Router();

// router.get("/invite", authController.inviteInfo);

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post(
//     "/forgot-password",
//     authValidator.forgotPassword,
//     authController.forgotPassword
// );

// router.patch(
//     "/reset-password",
//     authValidator.resetPassword,
//     authController.resetPassword
// );
module.exports = router;
