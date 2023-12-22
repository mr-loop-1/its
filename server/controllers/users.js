const config = require("../config");
const { usersModel, invitesModel } = require("./../models");

exports.getInvites = async (req, res) => {
    const user = req.user;

    const documents = await invitesModel
        .find({
            invited: user.id,
        })
        .populate([
            { path: "invited", model: "users" },
            { path: "invitedBy", model: "users" },
            { path: "projectId", model: "projects" },
        ]);

    // const data = //! TRANFROMEr

    return res.json(data);
};

exports.sendInvite = async (req, res) => {
    const user = req.user;
    const body = req.body;
    const createInvite = new invitesModel({
        invited: body.invited,
        invitedBy: user.id,
        projectId: body.projectId,
        status: false,
    });
    const newInvite = await createInvite.save();
    return res.json("CREATED INV");
};

exports.acceptInvite = async (req, res) => {
    const user = req.user;
    const params = req.params;
    const documents = await invitesModel.findByIdAndUpdate(params.inviteId, {
        status: true,
    });

    return res.json("DONEINVITE");
};

exports.rejectInvite = async (req, res) => {
    const user = req.user;

    const documents = await invitesModel.findByIdAndUpdate(params.inviteId, {
        status: false,
    });

    return res.json("REMOVED INV");
};
