import { PRIVATE_GITHUB_ACCESS_TOKEN as accessToken } from '$env/static/private';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: accessToken });

export async function getRepoId(repoName: string, repoOwner: string) {
	return await octokit.graphql(
		`query {
        repository (name: $repoName, owner: $repoOwner)  {
              id
        }
      }`,
		{ repoName, repoOwner }
	);
}

export async function getRepos(repoIds: string[]) {
	return await octokit.graphql(
		`query MyQuery {
        nodes(ids: $repoIds) {
          ... on Repository {
            id
            name
            shortDescriptionHTML
          }
        }
      }`,
		{ repoIds }
	);
}
