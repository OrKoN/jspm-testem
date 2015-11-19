#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var replaceStream = require('replacestream');

var TEST_DIR = './test';
var TEST_RUNNER = './test-runner.mustache';
var TEST_TESTEM = './testem.json';
var argv = require('minimist')(process.argv.slice(2));
var opts = {};

function copy(src, dest, opts) {
  if (opts.force || !fs.existsSync(dest)) {
    fs.createReadStream(src)
      .pipe(replaceStream('%Framework%', opts.framework))
      .pipe(fs.createWriteStream(dest));
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

_.defaults(opts, argv, {
  force: false,
  framework: 'mocha'
});

ensureDir(TEST_DIR);
copy(__dirname + '/../frameworks/' + opts.framework + '/basic.js', './test/basic.js', opts);
copy(__dirname + '/../package/' + TEST_RUNNER, TEST_RUNNER, opts);
copy(__dirname + '/../package/' + TEST_TESTEM, TEST_TESTEM, opts);

var pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

if (!pjson.jspm) {
  pjson.jspm = {};
}

if (!pjson.jspm.overrides) {
  pjson.jspm.overrides = {};
}

var frameworkDependencies = require('../frameworks/' + opts.framework + '/dependencies');

pjson.jspm.overrides = {
  'github:OrKoN/jspm-testem@master': {
    'dependencies': frameworkDependencies
  }
};

fs.writeFileSync('./package.json', JSON.stringify(pjson, null, 2));

var jspm = require('jspm');
jspm
  .install('jspm-testem',
    'github:OrKoN/jspm-testem@master',
    { dev: true })
  .then(() => console.log('Installed jspm-testem with ' + opts.framework + ' support'))
  .then(() => jspm
  .install(frameworkDependencies, { dev: true }))
  .catch((err) => console.error('Failed to install jspm-testem with ' + opts.framework + ' support', err));

