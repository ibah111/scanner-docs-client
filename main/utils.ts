import gitSemverTags from 'git-semver-tags';
/**
 * never used, but i will keep it
 * @deprecated
 */
export const LastAvailableVersion = await gitSemverTags().then(
  (tags) => tags[0],
);
