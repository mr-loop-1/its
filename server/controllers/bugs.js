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
        const newBug = new bugsModel({
            title: body.title,
            description: body?.description,
            projectId: params.projectId,
            createdBy: user.id,
            assignedTo: user.id,
            commits: {
                open: body?.commits?.id,
            },
            status: true,
            progress: 1,
            priority: config.priority.priorityCode[body?.priority],
        });
        const document = await newBug.save();

        if (body?.commits) {
            const commit = await commitsModel.findById(body.commits.id);
            if (commit) {
                commit.bugs.open.push(document._id);
            } else {
                const createCommit = new commitsModel({
                    commitId: body.commits.id,
                    projectId: params.projectId,
                    message: body.commit.message,
                    author: body.commit.author,
                    timestamp: body.commit.timestamp,
                    bugsOpened: [document.id],
                });
                await projectsModel.findByIdAndUpdate(params?.projectId, {
                    $push: { commits: body.commits.id },
                });
                await createCommit.save();
            }
        }
        await projectsModel.findByIdAndUpdate(params?.projectId, {
            $push: { bugs: document._id },
        });
        await userModel.findByIdAndUpdate(user.id, {
            $push: { "bugs.assigned": document._id },
            $push: { "bugs.created": document._id },
        });
        // if (body?.assignedTo) {
        //     await userModel.findByIdAndUpdate(user.id, {
        //         $push: { projects: document._id },
        //     });
        // }

        // const data = bugTransformer.bug(document);

        res.status(200).json({ message: "Bug created" });
    } catch (err) {
        console.log("🚀 ~ file: bugs.js:64 ~ exports.createBug= ~ err:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.getBug = async (req, res, next) => {
    const params = req?.params;

    try {
        const document = await bugsModel
            .findById(params.bugId)
            .populate("projectId")
            .populate("createdBy")
            .populate("assignedTo");

        const data = bugTransformer.bug(document);
        return res.status(200).json(data);
    } catch {
        return res.send(500).json({ error: "Server Error" });
    }
};

exports.updateBug = async (req, res, next) => {
    const inputs = {
        ...(body?.title && { title: body?.title }),
        ...(body?.description && { description: body?.description }),
    };

    try {
        const document = await bugsModel.findByIdAndUpdate(
            req.body?.bugId,
            inputs
        );

        const data = bugTransformer.bug(document);
        return res.status(200).json(data);
    } catch {
        return res.send(500).json({ error: "Server Error" });
    }
};

exports.deleteBug = async (req, res, next) => {
    const params = req?.params;

    try {
        const document = await bugsModel.findByIdAndUpdate(params.bugId, {
            status: false, //! Soft delete
        });
        const open = await commitsModel.findByIdAndUpdate(
            document.commits.open,
            {
                $pull: { "bugs.open": document._id },
            }
        );
        if (!open.bugs.open.length && !open.bugs.close.length) {
            open.status = false;
            await open.save();
        }
        const close = await commitsModel.findByIdAndUpdate(
            document.commits.close,
            {
                $pull: { "bugs.open": document._id },
            }
        );
        if (!close.bugs.open.length && !close.bugs.close.length) {
            close.status = false;
            await close.save();
        }
        await userModel.findByIdAndUpdate(document.assignedTo, {
            $pull: { bugsAssigned: document._id },
        });
        await userModel.findByIdAndUpdate(document.createdBy, {
            $pull: { bugsCreated: document._id },
        });

        return res.status(200).json({ message: "Deleted Bug" });
    } catch {
        return res.send(500).json({ error: "Server Error" });
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
