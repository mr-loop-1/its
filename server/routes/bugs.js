// const express = require("express");
// const { bugsController } = require("./../../controllers/index");
// const { jwtStrategy, accessGuard } = require("./../middleware");
// const config = require("./../../config");

// const router = express.Router();

// router.get(
//     "/:bugId",
//     jwtStrategy,
//     accessGuard([config.accessLevel.ANY]),
//     bugsController.getBug
// ); //* bug details with stream
// router.get(bugsController.getBugs); //* all bugs for a user

// router.post("/:bugId/comment", bugsController.addComment); //* add stream element

// router.patch("/:bugId", bugsController.updateBug); //* update bug details

// router.delete("/:bugId", bugsController.deleteBug); //* delete bug
