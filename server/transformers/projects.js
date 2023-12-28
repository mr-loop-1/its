// const userTransformer = require("./users");
const bugTransformer = require("./bugs");
const config = require("../config");

exports.projects = (docs, options) => {
    console.log("🚀 ~ file: projects.js:6 ~ docs:", docs);
    // paginate in v2
    // const dataArray = documents;
    // if (options?.paginate) {
    //     const offset = options.perPage * options.page;
    //     dataArray = documents.slice(offset, offset + options.perPage);
    // }

    return docs.map((doc) => {
        return {
            project: {
                id: doc.projectId._id,
                title: doc?.projectId.title,
                description: doc?.projectId.description,
                // admin: userTransformer.user(doc.admin),
                // membersCount: members.length,
                // bugsCount: doc.bugs.length,
            },
            // role: config.accessCode[doc.role], //! resolve
        };
    });
};

exports.project = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        githubUrl: doc.github.url,
        description: doc.description,
        // admin: userTransformer.user(doc.admin),
        // manager: userTransformer.user(doc.manager),
        members: doc.members.map((member) => {}),
        bugs: doc.bugs.map((bug) => {}),
        commitsCount: doc.commits.length,
    };
};

exports.projectBugs = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        githubUrl: doc.github.url,
        description: doc.description,
        admin: {
            id: doc.admin._id,
            name: doc.admin.name,
            email: doc.admin.email,
            slug: doc.admin.slug,
        },
        manager: {
            id: doc.manager._id,
            name: doc.manager.name,
            email: doc.manager.email,
            slug: doc.manager.slug,
        },
        membersCount: members.length,
        bugs: doc.bugs.map((bug) => {
            return {
                id: bug._id,
                title: bug.title,
                description: bug.description,
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
            };
        }), //* for latest bugs' title, no nested bug loading
        commitsCount: doc.commits.length,
    };
};

exports.projectMembers = (doc) => {
    return {
        // id: doc._id,
        // title: doc.title,
        // githubUrl: doc.github.url,
        // description: doc.description,
        // admin: userTransformer.user(doc.admin),
        // manager: userTransformer.user(doc.manager),
        // members: doc.members.map((member) => userTransformer.user(member)),
        // bugsCount: doc.bugs.length,
        // commitsCount: doc.commits.length,
    };
};

exports.projectCommits = (docs) => {
    return docs.map((doc) => ({
        // sha: doc.commitId,
        // message: doc.message,
        // timestamp: doc.timestamp,
        // author: doc.author,
        // bugsCount: {
        //     open: doc.bugs.open.length,
        //     close: doc.bugs.close.length,
        // },
    }));
};
