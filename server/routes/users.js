const express = require("express");
// const { jwtStrategy, accessGuard } = require("./../middleware");
const config = require("../config");
const { userController } = require("../controllers");
const { authenticateToken } = require("../middleware/jwt");

const router = express.Router();

router.get("/invites", authenticateToken, userController.getInvites);
// router.get(""); //* user info
// router.get("/stream"); //* latest updates stream
// router.get("/infographics"); //* infographics
module.exports = router;
