const mongoose = require("mongoose");
mongoose.Types.ObjectId();

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
    },
    {
        timestamps: true,
    }
);

UsersModel = mongoose.model("users", userSchema);

module.exports = UsersModel;
