const express = require("express");
const router = express.Router();

router.post("/register");
router.post("/login");
router.post("/forgot-password");

router.patch("/reset-password");
