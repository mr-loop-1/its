const config = require("../config");
const { githubService } = require("../services");
const { getCommits } = require("../services/github-octokit");
const { projectTransformer } = require("../transformers");
const { projectsModel, userModel, commitsModel } = require("./../models");

exports.getLatestCommit = async (req, res) => {
    try {
        const params = req.params;

        const document = await projectsModel.findById(params.projectId);
        console.log(
            "🚀 ~ file: commits.js:12 ~ exports.getLatestCommit= ~ document:",
            document
        );

        // const commit = githubService.getCommits(
        //     document.github.token,
        //     document.github.url
        // );

        const commits = await githubService.getCommits(
            document.github.url,
            document.github.token
        );
        return res.status(200).json(commits);
    } catch (err) {
        console.log(
            "🚀 ~ file: commits.js:25 ~ exports.getLatestCommit= ~ err:",
            err
        );
        res.status(500).json({ error: "somethign wrnt wrong" });
    }
};

exports.listCommits = async (req, res) => {
    const params = req.params;

    const document = await projectsModel
        .findById(params.projectId)
        .populate({ path: "commits", model: "commits" });

    //! transformer

    return res.json(data);
};
