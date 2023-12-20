const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        commitId: {
            type: String,
        },
        author: {
            type: String,
        },
        commitTimestamp: {
            type: Date,
        },
        //? bugs that are started or closed at this commit
        bugIds: [
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

UsersModel = mongoose.model("users", userSchema);

module.exports = UsersModel;
