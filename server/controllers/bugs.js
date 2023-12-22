const config = require("../config");
const { bugsModel } = require("./../models");

exports.createBugs = async (req, res) => {
    const body = req?.body;

    const newBug = new bugsModel({
        title: body.title,
        description: body.description,
        github: body.github,
        admin: req.user.id,
        manager: body.manager,
        members: body.members,
        status: true,
    });
    const document = await newBug.save();

    document.members.forEach(async (memberId) => {
        await userModel.findByIdAndUpdate(memberId, {
            $push: { projects: document._id },
        });
    });

    const data = projectTransformer.project(document, options);

    res.status(200).json(data);
};
exports.getBugs = async (req, res, next) => {
    const filters = req.body.filters;

    const inputs = {
        status: filters?.status || config.status.ACTIVE,
    };
    const documents = await bugsModel.find(inputs);

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

exports.addComment = async (req, res, next) => {};

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
