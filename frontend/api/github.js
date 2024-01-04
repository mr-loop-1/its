import { Octokit, App } from 'octokit';

const githubRepoRegex =
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/;

export const checkGithub = async (repoUrl, token) => {
  try {
    const match = repoUrl.match(githubRepoRegex);

    if (match) {
      const username = match[1];
      const repoName = match[2];

      // console.log('Username:', username);
      // console.log('Repository Name:', repoName);

      const octokit = new Octokit({
        auth: token,
      });
      await octokit.rest.repos.get({ owner: username, repo: repoName });

      return true;
    } else {
      console.log('Invalid GitHub repository URL');
      return false;
    }
  } catch (err) {
    console.log('🚀 ~ file: github.js:10 ~ checkGithub ~ err:', err);
    return false;
  }
};
