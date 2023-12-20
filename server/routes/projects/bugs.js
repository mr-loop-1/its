const express = require("express");
const router = express.Router();

router.get("/:bugId"); //* bug details with stream
router.get(""); //* all bugs in all projects

router.post("/:bugId/stream"); //* add stream element

router.patch("/:bugId"); //* update bug details

router.delete("/:bugId"); //* delete bug
