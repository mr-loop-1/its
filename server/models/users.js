const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        empId: {
            type: String,
        },
        email: {
            type: String,
        },
        hashedPassword: {
            type: String,
        },
        name: {
            type: String,
        },
        roleId: {
            type: String,
        },
        projects: [
            {
                projectId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Projects",
                },
                role: {
                    type: String,
                    required: true,
                },
            },
        ],
        bugs: [
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
