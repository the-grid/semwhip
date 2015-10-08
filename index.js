import { all, anyPass, cond, F, has, identity, ifElse, map, mergeAll, nth,
  pick, pickBy, pipe, prop, props, split, T, test, values } from 'ramda';
import semver from 'semver';

const getVersion = pipe(split('#'), nth(1));

const validVersion = ifElse((x) => { return semver.valid(x) }, T, F);

const getDeps = pipe(props(['dependencies', 'devDependencies']), mergeAll);

const includeToRegExpTest = (i) => {
  return test(new RegExp('github.com/' + i));
}

const filterURLs = (opts) => {
  const regexs = map(includeToRegExpTest, opts.includeOwner);
  return pickBy(anyPass(regexs));
}


export default function semverify(pkg, opts) {
  const f = cond([
    [has('includeOwner'), filterURLs],
    [has('repos'),   (opts) => pick(prop('repos', opts))],
    [T,              (_) => identity]
  ])(opts);

  return pipe(
    getDeps,
    f,
    values,
    map(getVersion),
    all(validVersion)
  )(pkg);
};
