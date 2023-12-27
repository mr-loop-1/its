const express = require("express");
const { projectController } = require("./../../controllers/index");
const { projectsValidator } = require("./../../validators");
const { validatorError } = require("../../middleware");
const { authenticateToken } = require("../../middleware/jwt");

const router = express.Router();

// router.get("/:projectId/bugs", projectController.getProjectBugs); //* all bugs in a project
// router.get("/:projectId/user", projectController.getProjectMembers); //* list all members of project
// router.get("/:projectId", projectController.getProject); //* project details
router.get(
    "",
    // projectsValidator.createProject(),
    // validatorError.handle,
    authenticateToken,
    projectController.getProjects
); //* list all projects

// router.post("/:projectId/bug", projectController.createBug); //* create a bug in a project
// router.post("/:projectId/user", projectController.addMember); //* add member or manager to a project
router.post("", authenticateToken, projectController.createProject); //* create a project

// router.patch("/:projectId", projectController.updateProject); //* update project details

// router.delete("/:projectId", projectController.deleteProject); //* delete project
module.exports = router;
