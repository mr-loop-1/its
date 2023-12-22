const config = require("../config");
const { projectTransformer } = require("../transformers");
const { projectsModel, usersModel } = require("./../models");

exports.getProjects = async (req, res, next) => {
    // const inputs = {
    //     status: ACTIVE,
    // };
    const documents = await projectsModel.find();
    const data = projectTransformer.allProjects(documents);
    res.json(data);
};
exports.getProject = async (req, res, next) => {
    const inputs = {
        status: req.body?.status,
    };
};
exports.getProjectBugs = async (req, res, next) => {};
exports.getProjectMembers = async (req, res, next) => {};
exports.updateProject = async (req, res, next) => {};
exports.deleteProject = async (req, res, next) => {};
