const config = require("../config");
const { githubService } = require("../services");
const { projectTransformer } = require("../transformers");
const { projectsModel, userModel } = require("./../models");

exports.createProject = async (req, res) => {
    const body = req?.body;
    const user = req?.user;

    const newProject = new projectsModel({
        title: body.title,
        description: body?.description,
        github: body?.github,
        admin: user.id,
        manager: body?.manager,
        members: body.members,
        status: true,
    });
    const document = await newProject.save();

    document.members.forEach(async (memberId) => {
        await userModel.findByIdAndUpdate(memberId, {
            $push: { projects: document._id },
        });
    });

    const data = projectTransformer.project(document, options);

    res.status(200).json(data);
};

exports.deleteProject = async (req, res, next) => {
    const params = req?.params;

    const document = await projectsModel.findByIdAndUpdate(params.projectId, {
        status: false,
    });

    document.members.forEach(async (memberId) => {
        await userModel.findByIdAndUpdate(memberId, {
            $pull: { projects: document._id },
        });
    });
    document.bugs.forEach(async (bugId) => {
        const bug = await bugsModel.findByIdAndUpdate(bugId, {
            status: false,
        });
        await userModel.findByIdAndUpdate(bug.assignedTo, {
            $pull: { bugsAssigned: bug._id },
        });
        await userModel.findByIdAndUpdate(bug.createdBy, {
            $pull: { bugsCreated: bug._id },
        });
    });

    res.status(200).json("DELETED");
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
    const params = req?.params;

    const document = await projectsModel
        .findById(params.projectId)
        .populate({ path: "bugs", model: "bugs" });

    const data = projectTransformer.project(document, options);

    res.status(200).json(data);
};
exports.getProjectBugs = async (req, res, next) => {
    const body = req?.body;
    const params = req?.params;

    const document = await projectsModel.findById(params.projectId).populate({
        path: "bugs",
        model: "bugs",
        populate: [
            {
                path: "createdBy",
                model: "users",
            },
            {
                path: "assignedTo",
                model: "users",
            },
        ],
    });
    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.bugs(document.bugs, options);

    res.status(200).json(data);
};

exports.updateProject = async (req, res, next) => {
    const body = req?.body;
    const params = req?.params;

    const update = new projectsModel({
        ...(body?.title && { title: body.title }),
        ...(body?.description && { description: body.description }),
        ...(body?.github && { github: body.github }),
    });
    const document = await projectsModel.findByIdAndUpdate(
        params.projectId,
        update
    );

    const data = projectTransformer.project(document, options);

    res.status(200).json(data);
};

exports.getProjectMembers = async (req, res, next) => {
    const params = req?.params;
    const body = req?.body;

    const document = await projectsModel
        .findById(params.projectId)
        .populate({ path: "members", model: "users" });
    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.members(document.members, options);

    res.status(200).json(data);
};

exports.listCommits = async (req, res) => {
    const params = req.params;

    const document = await projectsModel.findById(params.projectId);

    const commit = githubService.getCommits(
        document.github.token,
        document.github.url
    );

    return commit;
};
