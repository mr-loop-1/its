// const userTransformer = require("./users");
const bugTransformer = require("./bugs");
const config = require("../config");

exports.allProjects = (docs, options) => {
    // paginate in v2
    // const dataArray = documents;
    // if (options?.paginate) {
    //     const offset = options.perPage * options.page;
    //     dataArray = documents.slice(offset, offset + options.perPage);
    // }

    return docs.map((doc) => {
        return {
            project: {
                id: doc._id,
                title: doc.title,
                description: doc.description,
                admin: userTransformer.user(doc.admin),
                membersCount: members.length,
                bugsCount: doc.bugs.length,
            },
            role: config.accessCode[doc.role], //! resolve
        };
    });
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
        membersCount: members.length,
        bugs: doc.bugs.map((bug) => bugTransformer.bug(bug)), //* for latest bugs' title, no nested bug loading
        commitsCount: doc.commits.length,
    };
};

exports.projectMembers = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        githubUrl: doc.github.url,
        description: doc.description,
        admin: userTransformer.user(doc.admin),
        manager: userTransformer.user(doc.manager),
        members: doc.members.map((member) => userTransformer.user(member)),
        bugsCount: doc.bugs.length,
        commitsCount: doc.commits.length,
    };
};

exports.projectCommits = (docs) => {
    return docs.map((doc) => ({
        sha: doc.commitId,
        message: doc.message,
        timestamp: doc.timestamp,
        author: doc.author,
        bugsCount: {
            open: doc.bugs.open.length,
            close: doc.bugs.close.length,
        },
    }));
};
