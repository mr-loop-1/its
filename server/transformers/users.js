const { userTransformer } = require(".");
const config = require("../config");

exports.user = (doc) => {
    return {
        id: doc._id,
        name: doc.name,
        email: doc.email,
    };
};

exports.invites = (docs) => {
    return docs.map((doc) => {
        return {
            invitedBy: userTransformer.user(doc.invitedBy),
            timestamp: doc.timestamp,
            project: projectTransformer.project(doc.projectId),
            role: config.inviteName[doc.role],
            status: config.inviteStatus[doc.status],
        };
    });
};
