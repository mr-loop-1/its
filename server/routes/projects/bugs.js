const express = require("express");
const { bugsController } = require("./../../controllers/index");

const router = express.Router();

router.get("/:bugId", bugsController.getBug); //* bug details with stream
router.get(bugsController.getBugs); //* all bugs in all projects

router.post("/:bugId/stream", bugsController.addStream); //* add stream element

router.patch("/:bugId", bugsController.updateBug); //* update bug details

router.delete("/:bugId", bugsController.deleteBug); //* delete bug
