const mongoose = require("mongoose");

// userType: {}, // v2
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            index: true,
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
                    ref: "projects",
                },
                role: {
                    type: Number,
                    enum: [],
                },
            },
        ],
        bugs: [
            {
                bugId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Bugs",
                },
                relation: {
                    type: Number,
                    enum: [],
                },
            },
        ],
        bugAssigned: [],
        bugsCreated: [],
        // bugs: {
        //     created: [
        //         {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "Bugs",
        //         },
        //     ],
        //     assigned: [
        //         {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "Bugs",
        //         },
        //     ],
        // },
    },
    {
        timestamps: true,
    }
);

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
