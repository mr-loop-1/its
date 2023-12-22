const config = require("../config");
const { projectTransformer } = require("../transformers");
const { projectsModel, userModel } = require("./../models");

exports.getProjects = async (req, res, next) => {
    const body = req?.body;
    /**
     * * only active ones
     * * only those where the person is a member, manager or admin
     * * hence instead of projectModel, use UserModel and then join with projectModel
     */
    const inputs = {
        //     status: ACTIVE,
    };
    const proj = await projectsModel.find();
    const documents = await userModel
        .findById(body?.userId)
        .populate({ path: "projects.projectId", model: "projects" });

    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.allProjects(documents, options);

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
