const mongoose = require("mongoose");

// userType: {}, // v2
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        hashedPassword: {
            type: String,
        },
        name: {
            type: String,
        },
        projects: [
            {
                projectId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Projects",
                },
                role: {
                    //* three types - admin, manager, member
                    type: String,
                    required: true,
                },
            },
        ],
        bugs: {
            created: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Bugs",
                },
            ],
            assigned: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Bugs",
                },
            ],
        },
        // status: {
        //     type: Number,
        //     default: 1,
        // },
    },
    {
        timestamps: true,
    }
);

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
