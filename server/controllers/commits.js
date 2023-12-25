const config = require("../config");
const { githubService } = require("../services");
const { projectTransformer } = require("../transformers");
const { projectsModel, userModel, commitsModel } = require("./../models");

exports.getLatestCommit = async (req, res) => {
    const params = req.params;

    const document = await projectsModel.findById(params.projectId);

    const commit = githubService.getCommits(
        document.github.token,
        document.github.url
    );

    return res.json(commit);
};

exports.listCommits = async (req, res) => {
    const params = req.params;

    const document = await projectsModel
        .findById(params.projectId)
        .populate({ path: "commits", model: "commits" });

    //! transformer

    return res.json(data);
};
