const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        bugId: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Projects",
        },
        stream: [
            {
                type: {
                    type: String,
                },
                values: {
                    type: mongoose.Schema.Types.Mixed,
                },
            },
        ],
        commits: {
            commitOpen: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Commits",
            },
            commitClose: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Commits",
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

UsersModel = mongoose.model("bugs", userSchema);

module.exports = UsersModel;
