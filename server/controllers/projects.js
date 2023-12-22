const config = require("../config");
const { projectTransformer } = require("../transformers");
const { projectsModel, userModel } = require("./../models");

exports.createProject = async (req, res) => {
    const body = req?.body;

    const newProject = new projectsModel({
        title: body.title,
        description: body.description,
        github: body.github,
        admin: req.user.id,
        manager: body.manager,
        members: body.members,
        status: true,
    });
    const document = await newProject.save();

    const data = projectTransformer.project(document, options);

    res.status(200).json(data);
};

exports.getProjects = async (req, res, next) => {
    const body = req?.body;

    const document = await userModel
        .findById(body.userId)
        .populate({ path: "projects.projectId", model: "projects" });

    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.allProjects(document.projects, options);

    res.status(200).json(data);
};
exports.getProject = async (req, res, next) => {
    const body = req?.body;

    const document = await projectsModel
        .findById(body.projectId)
        .populate({ path: "bugs", model: "bugs" });

    const data = projectTransformer.project(document, options);

    res.status(200).json(data);
};
exports.getProjectBugs = async (req, res, next) => {
    const body = req?.body;

    const document = await projectsModel
        .findById(body.projectId)
        .populate({ path: "bugs", model: "bugs" });
    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.bugs(document.bugs, options);

    res.status(200).json(data);
};
exports.getProjectMembers = async (req, res, next) => {
    const body = req?.body;

    const document = await projectsModel
        .findById(body.projectId)
        .populate({ path: "bugs", model: "bugs" });
    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.bugs(document.bugs, options);

    res.status(200).json(data);
};
exports.updateProject = async (req, res, next) => {};
exports.deleteProject = async (req, res, next) => {};
