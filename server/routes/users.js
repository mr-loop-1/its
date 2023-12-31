const express = require("express");
// const { jwtStrategy, accessGuard } = require("./../middleware");
const config = require("../config");
const { userController } = require("../controllers");
const { authenticateToken } = require("../middleware/jwt");

const router = express.Router();

router.get("/invites", authenticateToken, userController.getInvites);
router.post(
    "/invites/:projectId",
    authenticateToken,
    userController.acceptInvite
);

module.exports = router;
