const config = require("../config");
const { bugTransformer } = require("../transformers");
const {
    bugsModel,
    userModel,
    projectsModel,
    commitsModel,
} = require("./../models");

exports.createBug = async (req, res) => {
    const body = req?.body;
    const user = req?.user;
    const params = req?.params;
    console.dir(params);

    try {
        const project = await projectsModel.findById(params?.projectId);

        const newBug = new bugsModel({
            title: body.title,
            description: body?.description,
            projectId: params.projectId,
            createdBy: user.id,
            assignedTo: user.id,
            ...(project.isGithub
                ? {
                      commits: {
                          open: body?.commit?.id,
                      },
                  }
                : { commits: { open: "" } }),
            status: true,
            progress: 1,
            priority: config.priority.priorityCode[body?.priority],
        });
        const document = await newBug.save();

        // await projectsModel.findByIdAndUpdate(params?.projectId, {
        //     $push: { bugs: document._id },
        // });
        project.bugs.push(document._id);
        await project.save();

        if (project.isGithub) {
            const commit = await commitsModel.findOne({
                commitId: body.commit.id,
                projectId: params.projectId,
            });
            if (commit) {
                commit.bugs.open.push(document._id);
                await commit.save();
            } else {
                const createCommit = new commitsModel({
                    commitId: body.commit.id,
                    projectId: params.projectId,
                    // author: body.commit.author,
                    timestamp: body.commit.timestamp,
                    bugs: { open: [document.id] },
                });
                // await projectsModel.findByIdAndUpdate(params?.projectId, {
                //     $push: { commits: body.commits.id },
                // });
                await createCommit.save();
            }
        }

        await userModel.findByIdAndUpdate(user.id, {
            $push: { "bugs.assigned": document._id },
            $push: { "bugs.created": document._id },
        });

        res.status(200).json({ message: "Bug created" });
    } catch (err) {
        console.log("🚀 ~ file: bugs.js:64 ~ exports.createBug= ~ err:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.getBug = async (req, res, next) => {
    const params = req?.params;
    // console.log("🚀 ~ file: bugs.js:75 ~ exports.getBug= ~ params:", params);

    try {
        const document = await bugsModel
            .findById(params.bugId)
            // .find({ status: true })
            .populate({
                path: "projectId",
                model: "projects",
                populate: [
                    {
                        path: "members",
                        model: "users",
                    },
                ],
            })
            .populate("createdBy")
            .populate("assignedTo");

        const data = bugTransformer.bug(document);
        // console.log("🚀 ~ file: bugs.js:93 ~ exports.getBug= ~ data:", data);
        return res.status(200).json(data);
    } catch (err) {
        console.log("🚀 ~ file: bugs.js:86 ~ exports.getBug= ~ err:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.updateBug = async (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const inputs = {
        ...(body?.title && { title: body?.title }),
        ...(body?.description && { description: body?.description }),
        ...(body?.assignedTo && { assignedTo: body?.assignedTo }),
        ...(body?.priority && { priority: body?.priority }),
        ...(body?.status && { status: body?.status }),
        ...(body?.progress && {
            progress: config.bugs.progressCode[body?.progress],
        }),
    };
    // console.log(
    //     "🚀 ~ file: bugs.js:115 ~ exports.updateBug= ~ body?.progress:",
    //     body?.progress
    // );
    // console.log(
    //     "🚀 ~ file: bugs.js:106 ~ exports.updateBug= ~ inputs:",
    //     inputs
    // );
    try {
        const document = await bugsModel.findByIdAndUpdate(
            params.bugId,
            inputs
        );

        // const data = bugTransformer.bug(document);
        return res.status(200).json("UPDATE SUCCESS");
    } catch (err) {
        console.log("🚀 ~ file: bugs.js:122 ~ exports.updateBug= ~ err:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.deleteBug = async (req, res, next) => {
    const params = req?.params;

    try {
        const document = await bugsModel
            .findByIdAndUpdate(params.bugId, {
                status: false, //! Soft delete
            })
            .populate({
                path: "projectId",
                model: "projects",
            });
        if (document.projectId.isGithub) {
            const open = await commitsModel.findOneAndUpdate(
                { commitId: document.commits.open },
                {
                    $pull: { "bugs.open": document._id },
                }
            );
            if (!open.bugs.open.length) {
                open.status = false;
                await open.save();
            }
        }

        // if (!open.bugs.open.length && !open.bugs.close.length) {
        //     open.status = false;
        //     await open.save();
        // }
        // const close = await commitsModel.findByIdAndUpdate(
        //     document.commits.close,
        //     {
        //         $pull: { "bugs.open": document._id },
        //     }
        // );
        // if (!close.bugs.open.length && !close.bugs.close.length) {
        //     close.status = false;
        //     await close.save();
        // }
        await userModel.findByIdAndUpdate(document.assignedTo, {
            $pull: { bugsAssigned: document._id },
        });
        await userModel.findByIdAndUpdate(document.createdBy, {
            $pull: { bugsCreated: document._id },
        });

        return res.status(200).json({ message: "Deleted Bug" });
    } catch (err) {
        console.log("🚀 ~ file: bugs.js:184 ~ exports.deleteBug ~ err:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

// exports.getBugs = async (req, res, next) => {
//     const body = req?.body;
//     const user = req?.user;

//     // const filters = {
//     //     ...(body?.assignedTo && { assginedTo: body.assignedTo }),
//     //     ...(body?.priority && { priority: body.priority }),
//     //     ...(body?.progress && { progrss: body.progress }),
//     // };

//     const documents = await userModel
//         .findById(user.id)
//         // .find(filters)
//         .populate({ path: "bugs", model: "projects" });

//     // const options = {
//     //     paginate: body?.paginate || false,
//     //     page: body?.page,
//     //     perPage: body?.perPage,
//     // };

//     const data = bugTransformer.

//     return data;
// };
