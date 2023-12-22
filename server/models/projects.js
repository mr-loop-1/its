const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        github: {
            //! todo
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        members: [
            //* including manager
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        bugs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "bugs",
            },
        ],
        status: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const projectsModel = mongoose.model("projects", projectsSchema);

module.exports = projectsModel;
