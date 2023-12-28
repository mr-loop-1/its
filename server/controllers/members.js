const config = require("../config");
const { projectsModel, userModel, commitsModel } = require("./../models");

exports.removeMember = async (req, res) => {
    const body = req?.body;
    const params = req?.params;
    try {
        await projectsModel.findByIdAndUpdate(params.projectId, {
            $pull: { members: body.memberId },
        });
        await userModel.findByIdAndUpdate(body.memberId, {
            $pull: { projects: { projectId: params.projectId } },
        });
        //* not removing from bugs

        res.status(200).json({ message: "Removed member" });
    } catch {
        return res.send(500).json({ error: "Server Error" });
    }
};

exports.makeManager = async (req, res) => {
    const body = req?.body;
    const params = req?.params;
    try {
        const oldUser = await userModel.findOne({
            _id: body.oldMemberId,
        });

        const oldProject = oldUser.projects.findOne((proj) => {
            return proj.projectId == params.projectId;
        });
        let newRole =
            config.accessLevel.accessCode["ADMIN"] === oldProject.role ? 1 : 3;
        await userModel.findOneAndUpdate(
            {
                _id: body.oldMemberId,
                "projects.projectId": params.projectId,
            },
            { $set: { "projects.$.role": newRole } }
        );

        const newUser = await userModel.findOne({
            _id: body.newMemberId,
        });

        const newProject = newUser.projects.findOne((proj) => {
            return proj.projectId == params.projectId;
        });
        newRole =
            config.accessLevel.accessCode["ADMIN"] === newProject.role ? 1 : 2;
        await userModel.findOneAndUpdate(
            {
                _id: body.newMemberId,
                "projects.projectId": params.projectId,
            },
            { $set: { "projects.$.role": newRole } }
        );

        await projectsModel.findByIdAndUpdate(params.projectId, {
            manager: body.newMemberId,
        });

        res.status(200).json({ message: "Made manager" });
    } catch {
        return res.send(500).json({ error: "Server Error" });
    }
};
