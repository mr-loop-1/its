const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
    {
        invited: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects",
        },
        status: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

const invitesModel = mongoose.model("invites", inviteSchema);

module.exports = invitesModel;
