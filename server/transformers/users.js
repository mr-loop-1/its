const config = require("../config");

exports.userToken = (user, token) => {
    return {
        token: token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            slug: user?.slug,
        },
    };
};

exports.user = (doc) => {
    return {
        id: doc._id,
        name: doc.name,
        email: doc.email,
        slug: doc.slug,
    };
};

exports.invites = (docs) => {
    return docs.map((doc) => ({
        id: doc.id,
        invitedBy: {
            id: doc.invitedBy._id,
            name: doc.invitedBy.name,
            email: doc.invitedBy.email,
        },
        projectId: {
            id: doc.projectId._id,
            title: doc.projectId.title,
        },
    }));
};

// exports.invites = (docs) => {
//     return docs.map((doc) => {
//         return {
//             invitedBy: {
//                 id: doc.invitedBy._id,
//                 name: doc.invitedBy.name,
//                 email: doc.invitedBy.email,
//             },
//             timestamp: doc.timestamp,
//             project: projectTransformerormer.project(doc.projectId),
//             role: config.inviteName[doc.role],
//             status: config.inviteStatus[doc.status],
//         };
//     });
// };
