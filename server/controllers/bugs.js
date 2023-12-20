const config = require("../config/settingStore");
const { bugsModel } = require("./../models");

exports.getBugs = async (req, res, next) => {
    const filters = req.body.filters;

    const inputs = {
        status: filters?.status || config.status.ACTIVE,
    };
    const documents = await bugsModel.find(inputs);

    //! pass to transformers

    return data;
};

exports.getBug = async (req, res, next) => {};

exports.updateBug = async (req, res, next) => {};

exports.addStream = async (req, res, next) => {};

exports.deleteBug = async (req, res, next) => {};
