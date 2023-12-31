const {
    projectsModel,
    userModel,
    bugsModel,
    commitsModel,
} = require("./../models");
const config = require("../config");

exports.addStream = async (req, res) => {
    const body = req?.body;
    const params = req?.params;

    let document;

    if (body.streamType) {
        switch (body.streamType) {
            case "COMMENT": {
                //* mentioning a user in a comment
                //* V2
                const { author, comment, timestamp } = body;
                document = await bugsModel.findByIdAndUpdate(params.bugId, {
                    $push: {
                        stream: {
                            type: body.streamType,
                            value: { author, comment, timestamp },
                        },
                    },
                });
                break;
            }
            case "PROGRESS": {
                const { author, prev, now, timestamp } = body;
                // if (now === "CLOSE") {
                //     const { commitId, projectId } = body;
                //     await bugsModel.findByIdAndUpdate(params.bugId, {
                //         progress: now,
                //         $push: { "commits.close": commitId },
                //     });
                //     await commitsModel.findByIdAndUpdate(commitId, {
                //         $push: { "bugs.close": params.bugsId },
                //     });
                //     await projectsModel.findByIdAndUpdate(projectId, {
                //         $push: { commits: commitId },
                //     });
                // } else {
                //     await bugsModel.findByIdAndUpdate(params.bugId, {
                //         progress: now,
                //     });
                // }
                document = await bugsModel.findByIdAndUpdate(params.bugId, {
                    $push: {
                        stream: {
                            type: body.streamType,
                            value: { author, prev, now, timestamp },
                        },
                    },
                });

                break;
            }
            case "ASSIGNED": {
                const { author, prev, now, timestamp } = body;
                await userModel.findByIdAndUpdate(old, {
                    $pull: { "bugs.assigned": params.bugId },
                });
                await userModel.findByIdAndUpdate(now, {
                    $push: { "bugs.assigned": params.bugId },
                });
                document = await bugsModel.findByIdAndUpdate(params.bugId, {
                    $push: {
                        stream: {
                            type: body.streamType,
                            value: { author, prev, now, timestamp },
                        },
                    },
                    assignedTo: now,
                });
                break;
            }
            case "PRIORITY": {
                const { author, prev, now, timestamp } = body;
                document = await bugsModel.findByIdAndUpdate(params.bugId, {
                    priority: config.priority.priorityCode[now],
                    $push: {
                        stream: {
                            type: body.streamType,
                            value: { author, prev, now, timestamp },
                        },
                    },
                });
                break;
            }
        }
    }

    return res.status(200).json("ADDED SUCCESS");
};
