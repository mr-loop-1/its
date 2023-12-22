exports.getCommits = (token, url) => {
    const { owner, repo } = url;
    const response = fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
        {
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
            },
        }
    );
    return {
        sha: response[0].sha,
        author: response[0].author.name,
        timestamp: response[0].author.date,
        message: response[0].message,
    };
};
