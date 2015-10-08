# semverify

WIP - validates your package.json for versioned dependencies

## Usage

Validates dependencies based on either an array of owner (user/organization)
names, or an array of repo names.

```
const pkg = require('./package.json');
// {
//   name: "My Repo",
//   version: "1.0.0",
//   description: "The quick brown fox writes a bunch a ES6",
//   dependencies: {
//     "foo": "git+https://github.com/the-grid/foo.git#0.1.0",
//     "bar": "git+https://github.com/someone-else/bar.git#1.5.0",
//     "baz": "^1.0.0",
//     "qux": "*"
//   }
// };

let options;

options = {
  repos: ['bar', 'baz'];
}

// OR

options = {
  includeOwner: ['the-grid']
}

semverify(pkg, options);
```
