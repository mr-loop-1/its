const mongoose = require("mongoose");

var projectsSchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
        },
        projectTitle: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        projectManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        projectMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const projectsModel = mongoose.model("projects", projectsSchema);

module.exports = projectsModel;
