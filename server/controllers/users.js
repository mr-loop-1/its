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

    // const data =

    return res.json(data);
};
