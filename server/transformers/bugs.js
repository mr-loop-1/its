// const { userTransformer } = require(".");
const config = require("../config");

exports.bug = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        description: doc.description,
        assignedTo: userTransformer.user(doc.assignedTo),
        createdBy: userTransformer.user(doc.createdBy),
        stream: doc.stream,
        priority: config.priorityCode[doc.priority],
        progress: config.progressCode[doc.progress],
        commits: doc.commits,
    };
};
exports.userBugs = (docs) => {
    return docs.map((doc) => ({
        id: doc._id,
        title: doc.title,
        description: doc.description,
        assignedTo: userTransformer.user(doc.assignedTo),
        createdBy: userTransformer.user(doc.createdBy),
        priority: config.priorityCode[doc.priority],
        progress: config.progressCode[doc.progress],
    }));
};
