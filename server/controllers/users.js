const config = require("../config");
const { userTransformer } = require("../transformers");
const {
    usersModel,
    invitesModel,
    projectsModel,
    userModel,
} = require("./../models");

exports.getInvites = async (req, res) => {
    const user = req.user;

    const documents = await invitesModel
        .find({
            invited: user.id,
        })
        .populate([
            { path: "invitedBy", model: "users" },
            { path: "projectId", model: "projects" },
        ]);

    const data = userTransformer.invites(documents);

    return res.json(data);
};

exports.sendInvite = async (req, res) => {
    const user = req.user;
    const body = req.body;
    const params = req.params;
    const createInvite = new invitesModel({
        invited: body.invited,
        invitedBy: user.id,
        projectId: params.projectId,
        role: config.accessLevel.accessCode.MEMBER,
        status: false,
    });
    await createInvite.save();
    return res.status(200).json("CREATED INVITATION");
};

exports.acceptInvite = async (req, res) => {
    const user = req.user;
    const params = req.params;
    const body = req.body;
    const document = await invitesModel.findByIdAndUpdate(params.inviteId, {
        status: true,
    });

    await projectsModel.findByIdAndUpdate(document.projectId, {
        $push: { members: user.id },
        ...(document.role === "ADMIN" && { admin: user.id }),
        ...(document.role === "MANAGER" && { manager: user.id }),
    });
    await userModel.findByIdAndUpdate(user.id, {
        $push: {
            projects: {
                projectId: document.projectId,
                role: config.accessLevel.accessCode[document.role],
            },
        },
    });

    return res.json("ACC INVITE");
};

exports.rejectInvite = async (req, res) => {
    const user = req.user;

    const documents = await invitesModel.findByIdAndUpdate(params.inviteId, {
        status: false,
    });
    await projectsModel.findByIdAndUpdate(document.projectId, {
        $pull: { members: user.id },
        ...(document.role === "ADMIN" && { admin: null }),
        ...(document.role === "MANAGER" && { manager: null }),
    });
    await userModel.findByIdAndUpdate(user.id, {
        $pull: {
            "projects.projectId": document.projectId,
        },
    });

    return res.json("REMOVED INV");
};
