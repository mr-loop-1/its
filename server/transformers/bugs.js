// const { userTransformer } = require(".");
const config = require("../config");

exports.bug = (bug) => {
    return {
        id: bug._id,
        // bugId:
        title: bug.title,
        description: bug.description,
        project: {
            id: bug.projectId._id,
            title: bug.projectId.title,
            description: bug.projectId.description,
            members: bug.projectId.members.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    slug: user.slug,
                };
            }),
        },
        assignedTo: {
            id: bug.assignedTo._id,
            name: bug.assignedTo.name,
            email: bug.assignedTo.email,
            slug: bug.assignedTo.slug,
        },
        createdBy: {
            id: bug.createdBy._id,
            name: bug.createdBy.name,
            email: bug.createdBy.email,
            slug: bug.createdBy.slug,
        },
        stream: bug.stream,
        priority: config.priority.priorityMap[bug.priority],
        progress: config.bugs.progressMap[bug.progress],
        commits: bug.commits,
        updatedAt: bug.updatedAt,
    };
};
// exports.userBugs = (docs) => {
//     return docs.map((doc) => ({
//         id: doc._id,
//         title: doc.title,
//         description: doc.description,
//         assignedTo: userTransformer.user(doc.assignedTo),
//         createdBy: userTransformer.user(doc.createdBy),
//         priority: config.priorityCode[doc.priority],
//         progress: config.progressCode[doc.progress],
//     }));
// };
