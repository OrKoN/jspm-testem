/* globals System, mocha, Promise */

import { defaults } from 'lodash';

const loadMocha = () => {
  return System.import('mocha');
};

const loadTestem = () => {
  return System.import('/testem');
};

const setUpMocha = (opts) => {
  mocha.setup(opts);
  return Promise.resolve();
};

const loadTests = (tests) => {
  return Promise.all(tests.map(test => System.import(test)));
};

const runTests = () => {
  mocha.run();
};

const setUpChai = () => {
  return System
    .import('chai')
    .then(chai => {
      chai.should();
    });
};

const prepareTarget = (framework) => {
  const target = document.getElementById('target');
  target.id = framework;
};

const normalizeTestPath = (test) => {
  return test.replace(/&#x2F;/gi, '/').replace(/\.js$/gi, '');
};

export function mochaTests(tests, opts) {
  tests = tests.map(normalizeTestPath);

  // TODO: parse options for URL
  defaults(opts, {
    ui: 'bdd'
  });

  return Promise.resolve()
    .then(() => prepareTarget('mocha'))
    .then(() => loadMocha())
    .then(() => loadTestem())
    .then(() => setUpMocha(opts))
    .then(() => setUpChai())
    .then(() => loadTests(tests))
    .then(() => runTests());
}

export default {
  mochaTests: mochaTests
};
