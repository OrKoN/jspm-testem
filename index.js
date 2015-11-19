/* globals System, mocha, Promise */

import { defaults } from 'lodash';

const loadTestem = () => {
  return System.import('/testem');
};

const loadTests = (tests) => {
  return Promise.all(tests.map(test => System.import(test)));
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

const loadFramework = (framework, opts) => {
  return System
    .import('jspm-testem/frameworks/' + framework + '/load')
    .then(load => load.default());
};

const setupFramework = (framework, opts) => {
  return System
    .import('jspm-testem/frameworks/' + framework + '/setup')
    .then(setup => setup.default(opts));
};

const runFramework = (framework, opts) => {
  return System
    .import('jspm-testem/frameworks/' + framework + '/run')
    .then(run => run.default(opts));
};

export function runTests(framework, tests, opts) {
  tests = tests.map(normalizeTestPath);

  // TODO: parse options for URL
  defaults(opts, {
    ui: 'bdd'
  });

  return Promise.resolve()
    .then(() => prepareTarget('mocha'))
    .then(() => loadFramework(framework, opts))
    .then(() => loadTestem())
    .then(() => setupFramework(framework, opts))
    .then(() => setUpChai())
    .then(() => loadTests(tests))
    .then(() => runFramework(framework));
}

export default {
  runTests: runTests
};
