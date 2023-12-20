const mongoose = require("mongoose");
mongoose.Types.ObjectId();

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
    },
    {
        timestamps: true,
    }
);

UsersModel = mongoose.model("users", userSchema);

module.exports = UsersModel;
