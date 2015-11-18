#!/usr/bin/env node

var fs = require('fs');
var TEST_DIR = './test';
var TEST_BASIC = './test/basic.js';
var TEST_RUNNER = './test-runner.mustache';
var TEST_TESTEM = './testem.json';

function copy(file) {
  if (!fs.existsSync(file)) {
    fs.createReadStream(__dirname + '/../package/' + file)
      .pipe(fs.createWriteStream(file));
  }
}

if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR);
}

copy(TEST_BASIC);
copy(TEST_RUNNER);
copy(TEST_TESTEM);

var jspm = require('jspm');

jspm
  .install('jspm-testem', 'github:OrKoN/jspm-testem@master');
