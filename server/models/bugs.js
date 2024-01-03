const mongoose = require("mongoose");
const config = require("../config");

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
            enum: config.priority.priorityCodeEnum,
        },
        progress: {
            type: Number,
            index: true,
            enum: config.bugs.progressCodeEnum,
        },
        description: {
            type: String,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects",
        },
        stream: [
            {
                cat: {
                    type: String, //* all types of stream
                    // enum: [1, 2, 3],
                },
                value: {
                    type: mongoose.Schema.Types.Mixed,
                },
            },
        ],
        commits: {
            open: {
                type: String,
                // type: mongoose.Schema.Types.ObjectId,
                // ref: "commits",
            },
            close: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "commits",
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        bugIdx: {
            type: Number,
            default: 0,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const bugsModel = mongoose.model("bugs", bugSchema);

module.exports = bugsModel;
