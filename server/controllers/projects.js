const config = require("../config");
const { githubService } = require("../services");
const { projectTransformer } = require("../transformers");
const {
    projectsModel,
    userModel,
    commitsModel,
    invitesModel,
} = require("./../models");

exports.createProject = async (req, res) => {
    const body = req?.body;
    const user = req?.user;
    try {
        const newProject = new projectsModel({
            title: body?.title,
            description: body?.description,
            github: body?.github,
            admin: user.id,
            manager: user.id,
            members: body?.members,
            bugs: [],
            commits: [],
            status: true,
        });
        const document = await newProject.save();

        await userModel.findByIdAndUpdate(user.id, {
            $push: {
                projects: {
                    projectId: document._id,
                    role: config.accessLevel.accessCode.ADMIN,
                },
            },
        });

        body.invites.forEach(async (emailId) => {
            // await userModel.findByIdAndUpdate(memberId, {
            //     $push: {
            //         projects: {
            //             projectId: document._id,
            //             role: config.accessLevel.accessCode.ADMIN,
            //         },
            //     },
            // });
            const createInvite = new invitesModel({
                invited: emailId,
                invitedBy: user.id,
                projectId: document._id,
                role: config.accessLevel.accessCode.MEMBER,
                status: false,
            });
            await createInvite.save();
        });
        const data = projectTransformer.project(document);

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.deleteProject = async (req, res, next) => {
    const params = req?.params;
    try {
        const document = await projectsModel.findByIdAndUpdate(
            params.projectId,
            {
                status: false,
            }
        );

        document.members.forEach(async (memberId) => {
            await userModel.findByIdAndUpdate(memberId, {
                $pull: { projects: { projectId: document._id } },
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

            const open = await commitsModel.findByIdAndUpdate(
                bug.commits.open,
                {
                    $pull: { "bugs.open": document._id },
                }
            );
            if (!open.bugs.open.length && !open.bugs.close.length) {
                open.status = false;
                await open.save();
            }
            const close = await commitsModel.findByIdAndUpdate(
                bug.commits.close,
                {
                    $pull: { "bugs.open": document._id },
                }
            );
            if (!close.bugs.open.length && !close.bugs.close.length) {
                close.status = false;
                await close.save();
            }
        });

        res.status(200).json({ message: "Deleted" });
    } catch {
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.getProjects = async (req, res, next) => {
    const user = req?.user;

    try {
        //* no need for projcet status as deleted when deleting
        const document = await userModel
            .findById(user.id)
            .populate({ path: "projects.projectId", model: "projects" });
        const data = projectTransformer.projects(document.projects);
        res.status(200).json(data);
    } catch {
        return res.status(500).json({ error: "Server Error" });
    }
};
exports.getProject = async (req, res) => {
    const params = req?.params;

    try {
        const document = await projectsModel
            .findById(params.projectId)
            .populate({
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
            })
            .populate({ path: "admin", model: "users" })
            .populate({ path: "manager", model: "users" })
            .populate({ path: "members", model: "users" });

        const data = projectTransformer.project(document);

        return res.status(200).json(data);
    } catch {
        return res.status(500).json({ error: "Server Error" });
    }
};
exports.getProjectBugs = async (req, res, next) => {
    const params = req?.params;
    try {
        const document = await projectsModel
            .findById(params.projectId)
            .populate({
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
        console.log(
            "🚀 ~ file: projects.js:169 ~ exports.getProjectBugs= ~ document:",
            document
        );
        const data = projectTransformer.bugs(document);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.updateProject = async (req, res) => {
    const body = req?.body;
    const params = req?.params;
    try {
        const update = new projectsModel({
            ...(body?.title && { title: body.title }),
            ...(body?.description && { description: body.description }),
            ...(body?.github && { github: body.github }),
        });
        const document = await projectsModel.findByIdAndUpdate(
            params.projectId,
            update
        );
        const data = projectTransformer.project(document);

        res.status(200).json(data);
    } catch {
        return res.status(500).json({ error: "Server Error" });
    }
};

// exports.getProjectMembers = async (req, res, next) => {
//     const params = req?.params;
//     const body = req?.body;

//     const document = await projectsModel
//         .findById(params.projectId)
//         .populate({ path: "members", model: "users" });

//     const options = {
//         paginate: body?.paginate || false,
//         page: body?.page,
//         perPage: body?.perPage,
//     };
//     const data = projectTransformer.members(document, options);

//     res.status(200).json(data);
// };
