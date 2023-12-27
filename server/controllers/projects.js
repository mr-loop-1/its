const config = require("../config");
const { githubService } = require("../services");
const { projectTransformer } = require("../transformers");
const { projectsModel, userModel, commitsModel } = require("./../models");

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

        const open = await commitsModel.findByIdAndUpdate(bug.commits.open, {
            $pull: { "bugs.open": document.id },
        });
        if (!open.bugs.open.length && !open.bugs.close.length) {
            open.status = false;
            await open.save();
        }
        const close = await commitsModel.findByIdAndUpdate(bug.commits.close, {
            $pull: { "bugs.open": document.id },
        });
        if (!close.bugs.open.length && !close.bugs.close.length) {
            close.status = false;
            await close.save();
        }
    });

    res.status(200).json("DELETED");
};

exports.getProjects = async (req, res, next) => {
    const body = req?.body;
    const user = req?.user;
    console.log(
        "🚀 ~ file: projects.js:77 ~ exports.getProjects= ~ user:",
        user
    );

    const document = await userModel
        .findById(req.user._id)
        .populate({ path: "projects.projectId", model: "projects" });
    console.log(
        "🚀 ~ file: projects.js:85 ~ exports.getProjects= ~ document:",
        document
    );

    if (!document) {
        return res.status(404).json("Not Found");
    }

    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };
    const data = projectTransformer.projects(document.projects, options);

    res.status(200).json(data);
};
exports.getProject = async (req, res, next) => {
    const params = req?.params;

    const document = await projectsModel
        .findById(params.projectId)
        .populate({ path: "bugs", model: "bugs" }); //* for only giving the latest bugs

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
    const data = projectTransformer.bugs(document, options);

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
    const data = projectTransformer.members(document, options);

    res.status(200).json(data);
};
