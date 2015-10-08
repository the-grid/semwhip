import { all, F, ifElse, map, mergeAll, nth, pick, pipe, props, split, T, values } from 'ramda';
import semver from 'semver';

const getVersion = pipe(split('#'), nth(1));

const validVersion = ifElse((x) => { return semver.valid(x) }, T, F);

const getDeps = pipe(props(['dependencies', 'devDependencies']), mergeAll);

export default function semverify(pkg, opts) {
  return pipe(
    getDeps,
    pick(opts.repos),
    values,
    map(getVersion),
    all(validVersion)
  )(pkg);
};
