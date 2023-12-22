const userTransformer = require("./users");
const bugTransformer = require("./bugs");

exports.allProjects = (documents, options) => {
    const dataArray = documents;
    if (options?.paginate) {
        const offset = options.perPage * options.page;
        dataArray = documents.slice(offset, offset + options.perPage);
    }

    return dataArray;
};

exports.project = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        githubUrl: doc.github.url,
        description: doc.description,
        admin: userTransformer.user(doc.admin),
        manager: userTransformer.user(doc.manager),
        members: doc.members.map((member) => userTransformer.user(member)),
        bugs: doc.bugs.map((bug) => bugTransformer.bug(bug)),
        commitsCount: doc.commits.length,
    };
};

exports.projectBugs = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        githubUrl: doc.github.url,
        description: doc.description,
        admin: userTransformer.user(doc.admin),
        manager: userTransformer.user(doc.manager),
        members: doc.members.map((member) => userTransformer.user(member)),
        bugs: doc.bugs.map((bug) => bugTransformer.bug(bug)),
        commitsCount: doc.commits.length,
    };
};

exports.projectMembers = (docs) => {};

exports.projectCommits = (docs) => {};
