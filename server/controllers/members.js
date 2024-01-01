const config = require("../config");
const { projectsModel, userModel, commitsModel } = require("./../models");

exports.removeMember = async (req, res) => {
    const params = req?.params;
    try {
        await projectsModel.findByIdAndUpdate(params.projectId, {
            $pull: { members: params.userId },
        });
        await userModel.findByIdAndUpdate(params.userId, {
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
        const project = await projectsModel.findByIdAndUpdate(
            params.projectId,
            {
                manager: body.memberId,
            }
        );
        const oldManager = project.manager;
        const oldUser = await userModel.findOne({
            _id: oldManager,
        });

        const projectWithRole = oldUser.projects.find((proj) => {
            return proj.projectId == params.projectId;
        });
        let newRole =
            config.accessLevel.accessCode["ADMIN"] === projectWithRole.role
                ? 1
                : 3;

        await userModel.findOneAndUpdate(
            {
                _id: oldManager,
                "projects.projectId": params.projectId,
            },
            { $set: { "projects.$.role": newRole } }
        );

        const newUser = await userModel.findOne({
            _id: body.memberId,
        });

        const newProjectWithRole = newUser.projects.find((proj) => {
            return proj.projectId == params.projectId;
        });
        newRole =
            config.accessLevel.accessCode["ADMIN"] === newProjectWithRole.role
                ? 1
                : 2;
        await userModel.findOneAndUpdate(
            {
                _id: body.memberId,
                "projects.projectId": params.projectId,
            },
            { $set: { "projects.$.role": newRole } }
        );

        res.status(200).json({ message: "Made manager" });
    } catch {
        return res.send(500).json({ error: "Server Error" });
    }
};
