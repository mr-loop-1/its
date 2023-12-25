const config = require("../config");
const {
    bugsModel,
    userModel,
    projectsModel,
    commitsModel,
} = require("./../models");

exports.createBugs = async (req, res) => {
    const body = req?.body;
    const user = req?.user;
    const params = req?.params;

    const newBug = new bugsModel({
        title: body.title,
        description: body?.description,
        projectId: params.projectId,
        createdBy: user.id,
        assignedTo: body?.assignedTo,
        commits: {
            open: body.commits.id,
        },
        status: true,
        progress: 1,
        priority: body?.priority,
    });
    const document = await newBug.save();

    const commit = await commitsModel.findById(body.commits.id);
    if (commit) {
        commit.bugs.open.push(document.id);
    } else {
        const createCommit = new commitsModel({
            commitId: body.commit.id,
            projectId: params.projectId,
            message: body.commit.message,
            author: body.commit.author,
            timestamp: body.commit.timestamp,
            bugsOpened: [document.id],
        });
        await projectsModel.findByIdAndUpdate(body?.projectId, {
            $push: { commits: body.commitId },
        });
        await createCommit.save();
    }
    await projectsModel.findByIdAndUpdate(body?.projectId, {
        $push: { projects: document._id },
    });
    await userModel.findByIdAndUpdate(body?.createdBy, {
        $push: { projects: document._id },
    });
    if (body?.assignedTo) {
        await userModel.findByIdAndUpdate(body?.assignedTo, {
            $push: { projects: document._id },
        });
    }

    const data = bugTranformer.bug(document);

    res.status(200).json(data);
};
exports.getBugs = async (req, res, next) => {
    const body = req?.body;
    const user = req?.user;

    const filters = {
        ...(body?.assignedTo && { assginedTo: body.assignedTo }),
        ...(body?.priority && { priority: body.priority }),
        ...(body?.progress && { progrss: body.progress }),
    };

    const documents = await userModel
        .findById(user.id)
        .find(filters)
        .populate({ path: "bugs", model: "projects" });

    const options = {
        paginate: body?.paginate || false,
        page: body?.page,
        perPage: body?.perPage,
    };

    //! pass to transformers

    return data;
};

exports.getBug = async (req, res, next) => {
    const params = req?.params;
    const document = await bugsModel
        .findById(params.bugId)
        .populate("projectId")
        .populate("createdBy")
        .populate("assignedTo");

    //! pass to transformers

    return data;
};

exports.updateBug = async (req, res, next) => {
    const inputs = {
        ...(body?.title && { title: body?.title }),
        ...(body?.description && { description: body?.description }),
    };
    const document = await bugsModel.findByIdAndUpdate(req.body?.bugId, inputs);

    //! pass to transformers

    return data;
};

exports.deleteBug = async (req, res, next) => {
    const params = req?.params;

    const document = await bugsModel.findByIdAndUpdate(params.bugId, {
        status: false, //! Soft delete
    });
    const open = await commitsModel.findByIdAndUpdate(document.commits.open, {
        $pull: { "bugs.open": document.id },
    });
    if (!open.bugs.open.length && !open.bugs.close.length) {
        open.status = false;
        await open.save();
    }
    const close = await commitsModel.findByIdAndUpdate(document.commits.close, {
        $pull: { "bugs.open": document.id },
    });
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

    return res.status(200).json("DELETED BUG");
};
