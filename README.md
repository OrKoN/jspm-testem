## JSPM Testem

[![npm version](https://badge.fury.io/js/jspm-testem.svg)](http://badge.fury.io/js/jspm-testem)
[![Build Status](http://img.shields.io/travis/OrKoN/jspm-testem.svg?style=flat)](https://travis-ci.org/OrKoN/jspm-testem)

This project automates the setup of tests for JSPM-powered projects using Testem.

 - [JSPM](https://github.com/jspm/jspm-cli)
 - [Testem](https://github.com/testem/testem)

It supports the following test frameworks:

 - [mocha](https://mochajs.org/)
 - [qunit](https://qunitjs.com/)
 - [jasmine](http://jasmine.github.io/) (*Not yet implemented*)

The tests run in the browser and many browsers are supported with Testem launchers: https://github.com/testem/testem#launchers

## Installation

jspm-testem is both a JSPM-compatible JS module and a cli command. The cli command automates the setup and the JS module integrates Testem, JSPM and test frameworks in the runtime.

To install the CLI tool:

```sh
npm install jspm-testem -g
```

##  Usage

Assume that `jspm-project-dir` is the root folder of your JSPM module. Run the following command to add Mocha(default) tests for the project

```sh
cd jspm-project-dir
jspm-testem
```

This will create all files required for Testem and install required JSPM dependencies.
If you want to use a framework other than mocha:

```sh
jspm-testem --framework=qunit
```

By default the command does not override existing files. If you want to run the command again and update the test files, run:

```sh
jspm-testem --framework=qunit --force=true
```

## Example project

The test project here https://github.com/OrKoN/simple-jspm-project has tests enabled by `jspm-testem` in the `master` branch. The `without_tests` branch contains the version of the project before the tests were added: https://github.com/OrKoN/simple-jspm-project/tree/without_tests

## Status

The project is in very early stages. The API and functionality may change. If you think that some configuration options are missing or if you have troubles adapting `jspm-testem` for your project, please let me know via Issues or Pull Requests on Github.

## LICENSE

MIT