const express = require("express");
const router = express.Router();

router.get("/:projectId/bugs"); //* all bugs in a project
router.get("/:projectId/user"); //* list all members of project
router.get("/:projectId"); //* project details
router.get(""); //* all projects

router.post("/:projectId/bug"); //* create a bug in a project
router.post("/:projectId/user"); //* add member or manager to a project
router.post(""); //*

router.patch("/:projectId");

router.delete("/:projectId");
