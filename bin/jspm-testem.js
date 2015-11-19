#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var replaceStream = require('replacestream');

var TEST_DIR = './test';
var TEST_BASIC = './test/basic.js';
var TEST_RUNNER = './test-runner.mustache';
var TEST_TESTEM = './testem.json';
var argv = require('minimist')(process.argv.slice(2));
var opts = {};

function copy(file, opts) {
  if (opts.force || !fs.existsSync(file)) {
    fs.createReadStream(__dirname + '/../package/' + file)
      .pipe(replaceStream('%Framework%', opts.framework))
      .pipe(fs.createWriteStream(file));
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
copy(TEST_BASIC, opts);
copy(TEST_RUNNER, opts);
copy(TEST_TESTEM, opts);

var pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

if (!pjson.jspm) {
  pjson.jspm = {};
}

if (!pjson.jspm.overrides) {
  pjson.jspm.overrides = {};
}

pjson.jspm.overrides = {
  'github:OrKoN/jspm-testem@master': {
    'dependencies': require('../frameworks/' + opts.framework + '/dependencies')
  }
};

fs.writeFileSync('./package.json', JSON.stringify(pjson, null, 2));

var jspm = require('jspm');
jspm
  .install('jspm-testem',
    'github:OrKoN/jspm-testem@master',
    { dev: true });
