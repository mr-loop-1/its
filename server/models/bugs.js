const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
    {
        bugId: {
            type: Number, //* auto increment from 101 for each project
            index: true,
        },
        title: {
            type: String,
            index: true,
        },
        priority: {
            type: Number,
            index: true,
            enum: [],
        },
        progress: {
            type: Number,
            index: true,
            enum: [],
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
                    type: Number, //* all types of stream
                    enum: [],
                },
                value: {
                    type: mongoose.Schema.Types.Mixed,
                },
            },
        ],
        commits: {
            open: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Commits",
            },
            close: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Commits",
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        status: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

const bugsModel = mongoose.model("bugs", bugSchema);

module.exports = bugsModel;
