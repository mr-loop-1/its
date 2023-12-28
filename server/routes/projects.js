const express = require("express");
const { projectController } = require("../controllers/index");
const { authenticateToken } = require("../middleware/jwt");
const { accessGuard } = require("../middleware/guard");
const config = require("../config");

const router = express.Router();

router.get(
    "/:projectId/bugs",
    authenticateToken,
    projectController.getProjectBugs
); //* all bugs in a project
router.get("/:projectId", authenticateToken, projectController.getProject); //* project
router.get("", authenticateToken, projectController.getProjects); //* list all projects

router.post("/:projectId/bug", authenticateToken, projectController.createBug); //* create a bug in a project
router.post(
    "/:projectId/user",
    authenticateToken,
    accessGuard(config.accessStore.addMember),
    projectController.addMember
); //* add member to a project
router.post(
    "/:projectId/manager",
    authenticateToken,
    accessGuard(config.accessStore.makeManager),
    projectController.makeManager
); //* add manger to a project
router.post("", authenticateToken, projectController.createProject); //* create a project

router.patch(
    "/:projectId",
    authenticateToken,
    accessGuard(config.accessStore.modifyProject),
    projectController.updateProject
); //* update project details

router.delete(
    "/:projectId/user",
    authenticateToken,
    accessGuard(config.accessStore.removeMember),
    projectController.removeMember
);
router.delete(
    "/:projectId",
    authenticateToken,
    accessGuard(config.accessStore.deleteProject),
    projectController.deleteProject
); //* delete project
module.exports = router;
