const express = require("express");
const { bugsController, streamController } = require("./../controllers");
const { authenticateToken } = require("../middleware/jwt");

const router = express.Router();

router.get("/:bugId", authenticateToken, bugsController.getBug); //* bug details with stream
// router.get(bugsController.getBugs); //* all bugs for a user

router.post("/:bugId/stream", authenticateToken, streamController.addStream); //* add stream element

router.patch("/:bugId", authenticateToken, bugsController.updateBug); //* update bug details

router.delete("/:bugId", authenticateToken, bugsController.deleteBug); //* delete bug

module.exports = router;
