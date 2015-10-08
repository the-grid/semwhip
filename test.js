import { expect } from 'chai';
import semverify from './index.js';

const exampleOne = {
  name: "passing",
  version: "1.0.0",
  description: "The quick brown fox writes a bunch a ES6",
  dependencies: {
    "chromatose": "git+https://THISISOUROAUTHKEYLOL:x-oauth-basic@github.com/the-grid/chromatose.git#0.1.0",
    "typographyverse": "git+https://THISISOUROAUTHKEYLOL:x-oauth-basic@github.com/the-grid/typographyverse.git#1.5.0",
    "foo": "1.0.0",
    "bar": "~1.0.0",
    "baz": "^1.0.0",
    "qux": "*"
  }
};

const exampleTwo = {
  name: "failing",
  version: "1.0.0",
  description: "The quick brown fox writes a bunch a ES6",
  dependencies: {
    "chromatose": "git+https://THISISOUROAUTHKEYLOL:x-oauth-basic@github.com/the-grid/chromatose.git#8e1b0c3f368e59198ead88d0aded6fa86a27a716",
    "typographyverse": "git+https://THISISOUROAUTHKEYLOL:x-oauth-basic@github.com/the-grid/typographyverse.git#c4ad738c6f198ccd59074b838fcf403c6a3d141b",
    "foo": "1.0.0",
    "bar": "~1.0.0",
    "baz": "^1.0.0",
    "qux": "*"
  }
};

it("is cool when you don't depending on a commit SHA", () => {
  const opts = {
    repos: ['typographyverse', 'chromatose']
  }
  expect(semverify(exampleOne, opts)).to.be.true;
});

it("calls you out when you depend on commit SHAs", () => {
  const opts = {
    repos: ['typographyverse', 'chromatose']
  }
  expect(semverify(exampleTwo, opts)).to.be.false;
});
