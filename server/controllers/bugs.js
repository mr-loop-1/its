const config = require("../config");
const { bugsModel, userModel, projectsModel } = require("./../models");

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
        status: true,
    });
    const document = await newBug.save();

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
    const params = req?.params;

    const document = await userModel
        .findById(user.id)
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
    const inputs = {
        bugId: req.body?.bugId,
    };
    const document = await bugsModel.findById(inputs.bugId);

    //! pass to transformers

    return data;
};

exports.updateBug = async (req, res, next) => {
    const inputs = {
        ...(req.body?.assignedTo && { assignedTo: req.body?.assignedTo }),
        //! add others too
    };
    const result = await bugsModel.findByIdAndUpdate(req.body?.bugId, inputs);

    //! pass to transformers

    return data;
};

exports.deleteBug = async (req, res, next) => {
    //! first check the user access level
    if (req?.user.ROLE === config.accessLevel.accessCode.MEMBER) {
        throw new error();
    }

    const result = await bugsModel.findByIdAndUpdate(req.body?.bugId, {
        status: config.status.INACTIVE,
    });

    return res.send();
};
