const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
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
            required: true,
        },
        projectMembers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        bugs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "bugs",
            },
        ],
        status: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const projectsModel = mongoose.model("projects", projectsSchema);

module.exports = projectsModel;
