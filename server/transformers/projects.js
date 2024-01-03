// const userTransformer = require("./users");
const bugTransformer = require("./bugs");
const config = require("../config");

exports.projects = (docs) => {
    // paginate in v2
    // const dataArray = documents;
    // if (options?.paginate) {
    //     const offset = options.perPage * options.page;
    //     dataArray = documents.slice(offset, offset + options.perPage);
    // }
    return docs.map((doc) => {
        return {
            role: config.accessLevel.accessMap[doc.role],
            project: {
                id: doc.projectId._id,
                title: doc.projectId.title,
            },
        };
    });
};

exports.project = (doc) => {
    return {
        id: doc._id,
        title: doc.title,
        githubUrl: doc.github?.url,
        githubPAT: doc.github?.PAT,
        description: doc?.description,
        isGithub: doc?.isGithub,
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
        members: doc.members.map((mem) => {
            return {
                id: mem._id,
                name: mem.name,
                email: mem.email,
                slug: mem.slug,
            };
        }),
        bugs: doc.bugs.map((bug) => {
            return {
                id: bug._id,
                bugId: bug.bugId,
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
                updatedAt: bug.updatedAt,
            };
        }),
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
                bugId: bug.bugId,
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
                updatedAt: bug.updatedAt,
            };
        }),
        commitsCount: doc.commits.length,
    };
};
// exports.projectMembers = (doc) => {
//     return {
//         // id: doc._id,
//         // title: doc.title,
//         // githubUrl: doc.github.url,
//         // description: doc.description,
//         // admin: userTransformer.user(doc.admin),
//         // manager: userTransformer.user(doc.manager),
//         // members: doc.members.map((member) => userTransformer.user(member)),
//         // bugsCount: doc.bugs.length,
//         // commitsCount: doc.commits.length,
//     };
// };

// exports.projectCommits = (docs) => {
//     return docs.map((doc) => ({
//         // sha: doc.commitId,
//         // message: doc.message,
//         // timestamp: doc.timestamp,
//         // author: doc.author,
//         // bugsCount: {
//         //     open: doc.bugs.open.length,
//         //     close: doc.bugs.close.length,
//         // },
//     }));
// };
