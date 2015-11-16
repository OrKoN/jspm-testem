/* globals System, mocha, Promise */

const loadMocha = () => {
  return System.import('mocha');
};

const loadTestem = () => {
  return System.import('/testem');
};

const setUpMocha = () => {
  mocha.setup('bdd');
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

export function run(tests, opts) {
  tests = tests
    .map(t => t.replace(/&#x2F;/gi, '/'))
    .map(t => t.replace(/\.js$/gi, ''));

  return Promise.resolve()
    .then(() => loadMocha())
    .then(() => loadTestem())
    .then(() => setUpMocha())
    .then(() => setUpChai())
    .then(() => loadTests(tests))
    .then(() => runTests());
}

export default run;
