const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema(
    {
        commitId: {
            type: String,
        },
        author: {
            type: String,
        },
        timestamp: {
            type: Date,
        },
        //? bugs that are started or closed at this commit
        bugsOpened: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bugs",
            },
        ],
        bugsClosed: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bugs",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const commitsModel = mongoose.model("commits", commitSchema);

module.exports = commitsModel;
