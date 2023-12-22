const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema(
    {
        commitId: {
            type: String,
            index: true,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects",
            index: true,
        },
        author: {
            type: String,
        },
        timestamp: {
            type: Date,
        },
        //? bugs that are started or closed at this commit
        bugs: {
            open: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "bugs",
                },
            ],
            close: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "bugs",
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const commitsModel = mongoose.model("commits", commitSchema);

module.exports = commitsModel;
