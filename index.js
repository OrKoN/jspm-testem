/* globals System, mocha, Promise */

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

export function mocha(tests) {
  tests = tests
    .map(t => t.replace(/&#x2F;/gi, '/'))
    .map(t => t.replace(/\.js$/gi, ''));

  let opts = {
    ui: 'bdd'
  };

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
  mocha: mocha
};
