const { Octokit } = require("@octokit/rest");

const githubRepoRegex =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/;

exports.getCommits = async (repoUrl, token) => {
    console.log(
        "🚀 ~ file: github-octokit.js:7 ~ exports.getCommits= ~ repoUrl:",
        repoUrl
    );
    try {
        const match = repoUrl.match(githubRepoRegex);

        if (match) {
            const username = match[1];
            const repoName = match[2];

            console.log("Username:", username);
            console.log("Repository Name:", repoName);

            const octokit = new Octokit({
                auth: token,
            });

            const branchesResponse = await octokit.repos.listBranches({
                owner: username,
                repo: repoName,
            });

            const branches = branchesResponse.data;

            const commits = await Promise.all(
                branches.map(async (branch) => {
                    const branchName = branch.name;
                    // const commitResponse = await octokit.repos.getBranch({
                    //     owner: username,
                    //     repo: repoName,
                    //     branch: branchName,
                    // });

                    // const commitId = commitResponse.data.commit.sha.slice(0, 7); // Shorten to 7 characters
                    // const timestamp = commitResponse.data.commit.committer;
                    const commitsResponse = await octokit.repos.listCommits({
                        owner: username,
                        repo: repoName,
                        sha: branchName,
                        per_page: 1, // Only retrieve the latest commit
                    });

                    const latestCommit = commitsResponse.data[0];

                    const commitId = latestCommit.sha.slice(0, 7); // Shorten to 7 characters
                    const timestamp = latestCommit.commit.committer.date;
                    return {
                        branchName: branchName,
                        commitId: commitId,
                        timestamp: timestamp,
                    };
                })
            );
            console.log("Latest commits for each branch:", commits);

            return commits;
        } else {
            console.log("Github not responding");
            return [];
        }
    } catch (err) {
        console.log("🚀 ~ file: github.js:10 ~ checkGithub ~ err:", err);
        return [];
    }
};
