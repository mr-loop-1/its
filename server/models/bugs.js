const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        bugId: {
            type: String,
        },
        bugTitle: {
            type: String,
        },
        stream: [
            {
                type: String,
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
