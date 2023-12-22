const { projectsModel, userModel, bugsModel } = require("./../models");
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
                    $pull: { assigned: params.bugId },
                });
                await userModel.findByIdAndUpdate(now, {
                    $push: { assigned: params.bugId },
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
            }
        }
    }

    return res.status(200).json(data);
};
