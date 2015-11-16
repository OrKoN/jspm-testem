#!/usr/bin/env node

var fs = require('fs');
fs.mkdirSync('./test');
fs.writeFileSync('./test/basic.js', 'describe(\'it\', function() { it(\'should work\', function() {}); });');
fs.writeFileSync('./test-runner.mustache', '');
fs.writeFileSync('./testem.json', JSON.stringify({
  'src_files': [
    'test/**/*.js'
  ],
  'test_page': 'test-runner.mustache'
}, null, 2));
