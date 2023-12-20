const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
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
                    //! has to be enum for all the stream types
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
        status: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const bugsModel = mongoose.model("bugs", bugSchema);

module.exports = bugsModel;
