import gitSemverTags from 'git-semver-tags';

export const LastAvailableVersion = await gitSemverTags().then(
  (tags) => tags[0],
);
