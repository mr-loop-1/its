const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },
        github: {
            type: String,
            required: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        members: [
            //* including admin & manager
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        ],
        bugs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "bugs",
            },
        ],
        status: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

const projectsModel = mongoose.model("projects", projectsSchema);

module.exports = projectsModel;
